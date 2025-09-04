import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { getHardcodedAnswer } from "@/lib/hardcoded/answers";
import { supabase } from "@/integrations/supabase/client";
import { runMultiAgentProcess, AgentStep, BAD_HOMBURG_PROCESS } from "@/lib/multi-agent-process";

interface Message {
  id: string;
  type: 'user' | 'assistant';
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
}
interface ChatInterfaceProps {
  selectedDocuments: string[];
  onReset?: () => void;
}
const STARTER_QUESTIONS = ["Soll ich Dir eine Liste zum Handlungsbedarf für deine Bestandsmietverträge erstellen?", "Gib mir eine Übersicht über den Neuvermietungsbedarf für meine Objekte in Bad Homburg?", "Erstelle mir einen Monatsbericht über mein Immobilienportfolio für die Österreichische Versorgungskammer?", "Prüfe bitte, ob für mein Objekt ‚Alpha Park, München' weitere Fördergelder zur Verfügung stehen."];
export function ChatInterface({
  selectedDocuments,
  onReset
}: ChatInterfaceProps) {
  
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
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };
  useEffect(scrollToBottom, [messages]);
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
      
      scrollToBottom();
      
      // Wait for the step duration (except for user_prompt steps)
      if (step.type !== 'user_prompt') {
        await new Promise(resolve => setTimeout(resolve, step.duration));
      }
    }
    
    setIsMultiAgentProcessRunning(false);
    setPausedStepIndex(null);
    
    // Add completion message
    const completionMessage: Message = {
      id: `completion-${Date.now()}`,
      type: 'assistant',
      content: "System\n\n✅ Multi-Agent-Analyse abgeschlossen\n\nDie umfassende Neuvermietungsanalyse wurde erfolgreich durchgeführt. Alle 11 Agenten haben ihre Aufgaben koordiniert abgearbeitet und strategische Empfehlungen entwickelt.",
      timestamp: new Date(),
      agentType: 'confirmation'
    };
    setMessages(prev => [...prev, completionMessage]);
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

    // Try to get hardcoded answer first
    const hardcodedAnswer = getHardcodedAnswer(content);
    if (hardcodedAnswer) {
      // Check if this is the Bad Homburg process
      const isBadHomburgProcess = content.toLowerCase().includes("neuvermietungsbedarf") && 
                                  content.toLowerCase().includes("bad homburg");
      
      if (isBadHomburgProcess) {
        // Add introductory message
        const introMessage: Message = {
          id: Date.now().toString() + "_intro",
          type: "assistant",
          content: "Initialisiere Multi-Agent-System\n\n🔄 Starte umfassende Neuvermietungsanalyse für Bad Homburg.\n\nDie Multi-Agent-Analyse deckt folgende Bereiche ab:\n• Vertragsanalyse und Kündigungsoptionen\n• Mietersegmentierung und Zielgruppenidentifikation\n• Markterschließung und Leadgenerierung\n• Vermietungsstrategie-Entwicklung\n\nDies kann einen Moment dauern...",
          timestamp: new Date(),
          agentType: "thinking"
        };

        setMessages(prev => [...prev, introMessage]);
        setIsLoading(true);

        // Small delay before starting the process
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsLoading(false);
        
        // Run multi-agent process
        await simulateMultiAgentProcess();
      } else {
        // Regular thinking sequence
        const thinkingSequence = hardcodedAnswer.thinkingSequence || ["Denke nach..."];
        await simulateThinkingSequence(thinkingSequence);
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: hardcodedAnswer.answer,
          timestamp: new Date(),
          sources: hardcodedAnswer.sources,
          thinking: thinkingSequence
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      }
    } else {
      // Call real ChatGPT API via edge function
      const thinkingSequence = ["Verbinde mit ChatGPT...", "Analysiere Anfrage...", "Generiere Antwort..."];
      await simulateThinkingSequence(thinkingSequence);
      try {
        const {
          data,
          error
        } = await supabase.functions.invoke('chat-gpt', {
          body: {
            message: content,
            context: selectedDocuments.length > 0 ? "Ausgewählte Dokumente verfügbar" : ""
          }
        });
        if (error) {
          console.error('Edge function error:', error);
          throw error;
        }
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: data.response || "Entschuldigung, ich konnte keine Antwort generieren.",
          timestamp: new Date(),
          sources: data.sources || [],
          thinking: thinkingSequence
        };
        setMessages(prev => [...prev, assistantMessage]);
      } catch (error) {
        console.error('Error calling ChatGPT:', error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: "Entschuldigung, es gab einen Fehler beim Verbinden mit ChatGPT. Bitte versuchen Sie es erneut.",
          timestamp: new Date(),
          thinking: thinkingSequence
        };
        setMessages(prev => [...prev, errorMessage]);
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
  return <div className="flex flex-col h-full bg-estate-bg-primary">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {messages.length === 0 ? <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-estate-text-primary mb-2">Willkommen bei Prism</h1>
              <p className="text-estate-text-secondary">
                Stellen Sie Fragen zu Ihren Immobiliendokumenten
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl mb-8">
              {STARTER_QUESTIONS.map((question, index) => <Button key={index} variant="outline" onClick={() => handleStarterQuestion(question)} className="p-4 h-auto text-left border-estate-border hover:bg-estate-purple-light hover:border-estate-purple text-estate-text-primary whitespace-normal">
                  {question}
                </Button>)}
            </div>

            {/* Input field for custom questions */}
            <div className="w-full max-w-2xl">
              <div className="flex gap-3">
                <Input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder="Oder stellen Sie eine eigene Frage..." disabled={isLoading} className="flex-1 border-estate-border focus:ring-estate-purple focus:border-estate-purple" />
                <Button onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim() || isLoading} className="bg-estate-purple hover:bg-estate-purple-dark text-white shadow-button px-4">
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div> : <div className="max-w-4xl mx-auto">
            {messages.map(message => <ChatMessage key={message.id} message={message} />)}
            
            {currentThinking && <div className="flex gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-estate-purple-light text-estate-purple-dark flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-estate-purple-dark rounded-full animate-pulse"></div>
                </div>
                <Card className="flex-1 max-w-3xl p-4 bg-estate-bg-secondary border-estate-border">
                  <div className="text-sm text-estate-text-secondary italic">
                    💭 {currentThinking[currentThinking.length - 1]}
                  </div>
                </Card>
              </div>}
            
            <div ref={messagesEndRef} />
          </div>}
      </div>

      {/* Input Area - Always visible when messages exist */}
      {messages.length > 0 && <div className="border-t border-estate-border bg-estate-bg-secondary px-6 py-4">
          <div className="max-w-4xl mx-auto">
            
            <div className="flex gap-3">
              <Input 
                value={inputValue} 
                onChange={e => setInputValue(e.target.value)} 
                onKeyPress={handleKeyPress} 
                placeholder={
                  awaitingUserResponse 
                    ? "Ihre Antwort eingeben..." 
                    : isMultiAgentProcessRunning 
                      ? "Multi-Agent-Prozess läuft..." 
                      : "Nachricht eingeben..."
                } 
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
        </div>}

    </div>;
}