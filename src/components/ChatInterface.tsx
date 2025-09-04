import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, FileText } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { getHardcodedAnswer } from "@/lib/hardcoded/answers";
import { supabase } from "@/integrations/supabase/client";
import { runMultiAgentProcess, AgentStep, BAD_HOMBURG_PROCESS } from "@/lib/multi-agent-process";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'document';
  content: string;
  timestamp: Date;
  sources?: Array<{
    title: string;
    docId: string;
    page?: number;
  }>;
  thinking?: string[];
  agentSteps?: AgentStep[];
  isAgentStep?: boolean;
  agentType?: 'thinking' | 'doing' | 'confirmation' | 'user_prompt';
  documentName?: string;
  documentUrl?: string;
}

interface Document {
  id: string;
  name: string;
  uploadDate: Date;
  type: string;
  selected: boolean;
  file_path?: string;
  download_url?: string;
}

interface ChatInterfaceProps {
  selectedDocuments: string[];
  documents: Document[];
  onDocumentAdd: (updateFn: (docs: Document[]) => Document[]) => void;
  onReset?: () => void;
}

const STARTER_QUESTIONS = ["Soll ich Dir eine Liste zum Handlungsbedarf für deine Bestandsmietverträge erstellen?", "Gib mir eine Übersicht über den Neuvermietungsbedarf für meine Objekte in Bad Homburg?", "Erstelle mir einen Monatsbericht über mein Immobilienportfolio für die Österreichische Versorgungskammer?", "Prüfe bitte, ob für mein Objekt ‚Alpha Park, München' weitere Fördergelder zur Verfügung stehen."];

export function ChatInterface({
  selectedDocuments,
  documents,
  onDocumentAdd,
  onReset
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentThinking, setCurrentThinking] = useState<string[] | null>(null);
  const [currentAgentStep, setCurrentAgentStep] = useState<AgentStep | null>(null);
  const [isMultiAgentProcessRunning, setIsMultiAgentProcessRunning] = useState(false);
  const [awaitingUserResponse, setAwaitingUserResponse] = useState(false);
  const [currentUserPrompt, setCurrentUserPrompt] = useState<string | null>(null);
  const [pausedStepIndex, setPausedStepIndex] = useState<number | null>(null);
  const [userResponse, setUserResponse] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Reset function to clear chat messages
  const resetChat = () => {
    setMessages([]);
    setInputValue("");
    setIsLoading(false);
    setCurrentThinking(null);
    setCurrentAgentStep(null);
    setIsMultiAgentProcessRunning(false);
    setAwaitingUserResponse(false);
    setCurrentUserPrompt(null);
    setPausedStepIndex(null);
    setUserResponse(null);
    onReset?.();
  };

  // Expose reset function via useEffect
  useEffect(() => {
    if (onReset) {
      (window as any).resetChat = resetChat;
    }
  }, [onReset]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  useEffect(scrollToBottom, [messages]);

  const handleFileUpload = async (files: FileList) => {
    if (files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Ungültiger Dateityp",
        description: "Bitte wählen Sie eine PDF-, DOC-, DOCX- oder TXT-Datei aus.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "Datei zu groß",
        description: "Die Datei darf maximal 10MB groß sein.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      // Save document metadata to database
      const { data: docData, error: dbError } = await supabase
        .from('uploaded_documents')
        .insert({
          name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          download_url: publicUrl
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      // Update documents state
      const newDocument: Document = {
        id: docData.id,
        name: file.name,
        uploadDate: new Date(docData.created_at),
        type: file.type,
        selected: true,
        file_path: filePath,
        download_url: publicUrl
      };

      onDocumentAdd(prev => [...prev, newDocument]);

      // Add document message to chat
      const documentMessage: Message = {
        id: `doc-${Date.now()}`,
        type: 'document',
        content: `Dokument "${file.name}" wurde erfolgreich hochgeladen und ist jetzt verfügbar.`,
        timestamp: new Date(),
        documentName: file.name,
        documentUrl: publicUrl
      };

      setMessages(prev => [...prev, documentMessage]);

      toast({
        title: "Upload erfolgreich",
        description: `${file.name} wurde hochgeladen und steht zur Verfügung.`
      });

    } catch (error) {
      console.error('File upload error:', error);
      toast({
        title: "Upload fehlgeschlagen",
        description: "Es gab einen Fehler beim Hochladen der Datei.",
        variant: "destructive"
      });
    }
  };

  const simulateThinkingSequence = async (thinkingSteps: string[]) => {
    setCurrentThinking(thinkingSteps);
    for (let i = 0; i < thinkingSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
    }
    setCurrentThinking(null);
  };

  const simulateMultiAgentProcess = async (): Promise<void> => {
    setIsMultiAgentProcessRunning(true);
    const startIndex = pausedStepIndex !== null ? pausedStepIndex : 0;

    for (let i = startIndex; i < BAD_HOMBURG_PROCESS.length; i++) {
      const step = BAD_HOMBURG_PROCESS[i];

      // Handle steps with user input (including merged doing+user_prompt steps)
      if (step.requiresUserInput) {
        setAwaitingUserResponse(true);
        setCurrentUserPrompt(step.userPrompt || "Bitte geben Sie Ihre Antwort ein.");
        setPausedStepIndex(i + 1); // Resume from next step

        // For merged steps, show the full content including the user prompt
        const stepContent = `${step.agent}\n\n${step.icon} ${step.details}`;
        const agentMessage: Message = {
          id: `step-${step.id}-${Date.now()}`,
          type: 'assistant',
          content: stepContent,
          timestamp: new Date(),
          isAgentStep: true,
          agentType: step.type
        };
        setMessages(prev => [...prev, agentMessage]);
        scrollToBottom();
        return; // Pause the process here
      }

      // Handle confirmation step (uses user response)
      if (step.type === 'confirmation' && userResponse) {
        const confirmationContent = `System\n\n✅ ${step.details}\n\n*Ihre Antwort: "${userResponse}"*`;
        const confirmationMessage: Message = {
          id: `step-${step.id}-${Date.now()}`,
          type: 'assistant',
          content: confirmationContent,
          timestamp: new Date(),
          isAgentStep: true,
          agentType: 'confirmation'
        };
        setMessages(prev => [...prev, confirmationMessage]);
        setUserResponse(null); // Clear after using
      } else {
        // Regular agent step processing - clean formatting with agent name on separate line
        const stepContent = `${step.agent}\n\n${step.icon} ${step.details}`;
        const agentMessage: Message = {
          id: `step-${step.id}-${Date.now()}`,
          type: 'assistant',
          content: stepContent,
          timestamp: new Date(),
          isAgentStep: true,
          agentType: step.type
        };
        setMessages(prev => [...prev, agentMessage]);
      }

      // Add document notifications after specific steps
      if (step.id === 2) {
        // After Mietvertrags-Analyseagent doing step
        await new Promise(resolve => setTimeout(resolve, 5000));
        const excelDocument: Message = {
          id: `doc-${Date.now()}`,
          type: 'document',
          content: `📊 Mietvertragsmatrix wurde erfolgreich erstellt und steht zur Analyse bereit.`,
          timestamp: new Date(),
          documentName: "BadHomburg_Mietvertragsmatrix.xlsx",
          documentUrl: "#mietvertragsmatrix"
        };
        setMessages(prev => [...prev, excelDocument]);
      }

      if (step.id === 4) {
        // After Interaktions & Datenerhebungsagent thinking step
        await new Promise(resolve => setTimeout(resolve, 5000));
        const kontaktDocument: Message = {
          id: `doc-${Date.now()}`,
          type: 'document',
          content: `📋 Interaktions- & Kontaktliste wurde erstellt und ist einsatzbereit.`,
          timestamp: new Date(),
          documentName: "BadHomburg_Kontaktliste_Terminplanung.xlsx",
          documentUrl: "#kontaktliste"
        };
        setMessages(prev => [...prev, kontaktDocument]);
      }
      scrollToBottom();

      // Wait for the step duration (except for user_prompt steps)
      if (step.type !== 'user_prompt') {
        await new Promise(resolve => setTimeout(resolve, step.duration));
      }
    }
    setIsMultiAgentProcessRunning(false);
    setPausedStepIndex(null);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Handle user response to agent prompt
    if (awaitingUserResponse && currentUserPrompt) {
      setUserResponse(content);
      setAwaitingUserResponse(false);
      setCurrentUserPrompt(null);

      // Resume the multi-agent process after a short delay
      setTimeout(() => {
        simulateMultiAgentProcess();
      }, 500);
      return;
    }

    setIsLoading(true);

    // Check if this is the Bad Homburg multi-agent process first
    const isBadHomburgProcess = content.toLowerCase().includes("neuvermietungsbedarf") && content.toLowerCase().includes("bad homburg");
    
    if (isBadHomburgProcess) {
      // Add introductory message
      const introMessage: Message = {
        id: Date.now().toString() + "_intro",
        type: "assistant",
        content: "Initialisiere Multi-Agent-System 🔄\n\nStarte umfassende Neuvermietungsanalyse für Bad Homburg. Die Multi-Agent-Analyse deckt folgende Bereiche ab:\n• Vertragsanalyse und Kündigungsoptionen\n• Mietersegmentierung und Zielgruppenidentifikation\n• Markterschließung und Leadgenerierung\n• Vermietungsstrategie-Entwicklung\n\nDies kann einen Moment dauern...",
        timestamp: new Date(),
        agentType: "thinking"
      };
      setMessages(prev => [...prev, introMessage]);
      setIsLoading(true);

      // Small delay before starting the process
      await new Promise(resolve => setTimeout(resolve, 8000));
      setIsLoading(false);

      // Run multi-agent process
      await simulateMultiAgentProcess();
    } else {
      // Try to get hardcoded answer first
      const hardcodedAnswer = getHardcodedAnswer(content);
      if (hardcodedAnswer) {
        // Regular thinking sequence
        const thinkingSequence = hardcodedAnswer.thinkingSequence || ["Denke nach..."];
        await simulateThinkingSequence(thinkingSequence);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: hardcodedAnswer.answer,
          timestamp: new Date(),
          sources: hardcodedAnswer.sources
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Call real ChatGPT API via edge function
        const thinkingSequence = ["Analysiere Anfrage...", "Generiere Antwort..."];
        await simulateThinkingSequence(thinkingSequence);
        
        try {
          const { data, error } = await supabase.functions.invoke('chat-gpt', {
            body: {
              message: content,
              context: selectedDocuments.length > 0 ? "Ausgewählte Dokumente verfügbar" : ""
            }
          });
          
          if (error) {
            console.error('Edge function error:', error);
            throw error;
          }
          
          // Generate sources based on selected documents
          const sources = selectedDocuments.length > 0 
            ? documents.filter(doc => selectedDocuments.includes(doc.id)).map(doc => ({ 
                title: doc.name, 
                docId: doc.id 
              }))
            : [];

          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: 'assistant',
            content: data.response || "Entschuldigung, ich konnte keine Antwort generieren.",
            timestamp: new Date(),
            sources: sources
          };
          setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
          console.error('Error calling ChatGPT:', error);
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: 'assistant',
            content: "Entschuldigung, es gab einen Fehler beim Verbinden mit ChatGPT. Bitte versuchen Sie es erneut.",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
        }
      }
    }
    setIsLoading(false);
  };

  const handleStarterQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="flex flex-col h-full bg-estate-bg-primary">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        style={{ display: 'none' }}
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-estate-text-primary mb-2">Willkommen bei Prism</h1>
              <p className="text-estate-text-secondary">Stelle Fragen zu deinen Immobilien</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl mb-8">
              {STARTER_QUESTIONS.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleStarterQuestion(question)}
                  className="p-4 h-auto text-left border-estate-border hover:bg-estate-purple-light hover:border-estate-purple text-estate-text-primary whitespace-normal"
                >
                  {question}
                </Button>
              ))}
            </div>

            {/* Input field for custom questions */}
            <div className="w-full max-w-2xl">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-estate-border hover:bg-estate-purple-light hover:border-estate-purple text-estate-purple flex-shrink-0"
                >
                  <Paperclip size={16} />
                </Button>
                <Input
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Oder stelle eine eigene Frage..."
                  disabled={isLoading}
                  className="flex-1 border-estate-border focus:ring-estate-purple focus:border-estate-purple"
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-estate-purple hover:bg-estate-purple-dark text-white shadow-button px-4"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {currentThinking && (
              <div className="flex gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-estate-purple-light text-estate-purple-dark flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-estate-purple-dark rounded-full animate-pulse"></div>
                </div>
                <Card className="flex-1 max-w-3xl p-4 bg-estate-bg-secondary border-estate-border">
                  <div className="text-sm text-estate-text-secondary italic">
                    💭 {currentThinking[currentThinking.length - 1]}
                  </div>
                </Card>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area - Always visible when messages exist */}
      {messages.length > 0 && (
        <div className="border-t border-estate-border bg-estate-bg-secondary px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className="border-estate-border hover:bg-estate-purple-light hover:border-estate-purple text-estate-purple flex-shrink-0"
                disabled={isLoading || (isMultiAgentProcessRunning && !awaitingUserResponse)}
              >
                <Paperclip size={16} />
              </Button>
              <Input
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={awaitingUserResponse ? "Ihre Antwort eingeben..." : isMultiAgentProcessRunning ? "Multi-Agent-Prozess läuft..." : "Nachricht eingeben..."}
                disabled={isLoading || (isMultiAgentProcessRunning && !awaitingUserResponse)}
                className="flex-1 border-estate-border focus:ring-estate-purple focus:border-estate-purple"
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading || (isMultiAgentProcessRunning && !awaitingUserResponse)}
                className="bg-estate-purple hover:bg-estate-purple-dark text-white shadow-button px-4"
              >
                {isLoading ? "..." : awaitingUserResponse ? "Antworten" : <Send size={16} />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}