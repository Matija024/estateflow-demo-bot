import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

import { AgentStep } from "@/lib/multi-agent-process";

interface Source {
  title: string;
  docId: string;
  page?: number;
}

interface ChatMessageProps {
  message: {
    id: string;
    type: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    sources?: Source[];
    thinking?: string[];
    agentSteps?: AgentStep[];
    isAgentStep?: boolean;
    agentType?: 'thinking' | 'doing' | 'confirmation' | 'user_prompt';
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [showThinking, setShowThinking] = useState(false);
  const [currentThinkingStep, setCurrentThinkingStep] = useState(0);
  const [showAgentSteps, setShowAgentSteps] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
  };

  const getAgentIcon = (agentType?: string) => {
    switch (agentType) {
      case 'thinking': return '🔍';
      case 'doing': return '📊';
      case 'confirmation': return '✅';
      case 'user_prompt': return '❓';
      default: return <Bot size={16} />;
    }
  };

  const getAgentStyle = (agentType?: string) => {
    switch (agentType) {
      case 'thinking': return "bg-green-100 text-green-600 border-green-200";
      case 'doing': return "bg-blue-100 text-blue-600 border-blue-200";
      case 'confirmation': return "bg-emerald-100 text-emerald-600 border-emerald-200";
      case 'user_prompt': return "bg-amber-100 text-amber-600 border-amber-200";
      default: return "bg-estate-purple-light text-estate-purple-dark";
    }
  };

  const getTextStyle = (agentType?: string) => {
    switch (agentType) {
      case 'thinking': return "text-green-800";
      case 'doing': return "text-blue-800";
      case 'confirmation': return "text-emerald-800";
      case 'user_prompt': return "text-amber-800";
      default: return "text-estate-text-primary";
    }
  };
  
  const isUser = message.type === 'user';

  return (
    <div className={cn("flex gap-3 mb-6", isUser && "flex-row-reverse")}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
        isUser ? "bg-estate-purple text-white" : 
        message.isAgentStep ? getAgentStyle(message.agentType) :
        "bg-estate-purple-light text-estate-purple-dark"
      )}>
        {isUser ? <User size={16} /> : 
         message.isAgentStep ? getAgentIcon(message.agentType) :
         <Bot size={16} />}
      </div>
      
      <div className={cn("flex-1 max-w-3xl", isUser && "flex justify-end")}>
        <Card className={cn(
          "p-4 shadow-card transition-smooth",
          isUser ? "bg-estate-purple text-white" : 
          message.isAgentStep ? getAgentStyle(message.agentType) :
          "bg-estate-bg-secondary border-estate-border"
        )}>
          {!isUser && message.thinking && (
            <div className="mb-3 text-sm text-estate-text-secondary italic">
              💭 {message.thinking[currentThinkingStep] || "Denke nach..."}
            </div>
          )}

          {!isUser && message.agentSteps && message.agentSteps.length > 0 && (
            <div className="mb-4 space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAgentSteps(!showAgentSteps)}
                className="h-6 px-2 text-xs text-estate-text-secondary hover:text-estate-text-primary"
              >
                {showAgentSteps ? 'Verberge' : 'Zeige'} Multi-Agent-Prozess ({message.agentSteps.length} Schritte)
              </Button>
              
              {showAgentSteps && (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {message.agentSteps.map((step, index) => (
                    <div key={step.id} className="flex gap-2 p-2 bg-estate-bg-primary rounded-lg border border-estate-border">
                      <span className="text-sm flex-shrink-0">{step.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-estate-text-primary truncate">
                          {step.agent}
                        </div>
                        <div className="text-xs text-estate-text-secondary">
                          {step.type === 'thinking' ? 'Denkt...' : 'Macht...'} {step.action}
                        </div>
                        <div className="text-xs text-estate-text-secondary mt-1">
                          {step.details}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <div className={cn(
            "text-sm leading-relaxed",
            isUser ? "text-white" : 
            message.isAgentStep ? getTextStyle(message.agentType) :
            "text-estate-text-primary"
          )}>
            {message.content}
          </div>
          
          {!isUser && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-estate-border">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-7 px-2 text-estate-text-secondary hover:text-estate-text-primary"
                >
                  <Copy size={14} />
                </Button>
                <span className="text-xs text-estate-text-secondary">
                  {message.timestamp.toLocaleTimeString('de-DE', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          )}
          
          {message.sources && message.sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-estate-border">
              <div className="text-xs text-estate-text-secondary mb-2">
                Quellen:
              </div>
              <div className="flex flex-wrap gap-2">
                {message.sources.map((source, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 text-xs text-estate-purple-dark border-estate-purple hover:bg-estate-purple-light"
                  >
                    {source.title}
                    {source.page && ` (S. ${source.page})`}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}