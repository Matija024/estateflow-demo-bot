import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Upload, FileText, Calendar, HardDrive, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  name: string;
  size: string;
  uploadDate: Date;
  type: string;
  selected: boolean;
}

interface DocumentSidebarProps {
  documents: Document[];
  onDocumentSelect: (docId: string, selected: boolean) => void;
  onUpload: (files: FileList) => void;
}

export function DocumentSidebar({ documents, onDocumentSelect, onUpload }: DocumentSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onUpload(files);
    }
  };

  return (
    <div className="w-80 bg-estate-bg-secondary border-r border-estate-border flex flex-col h-screen">
      <div className="p-4 border-b border-estate-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-estate-text-primary">
            Dokumente
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-estate-text-secondary hover:text-estate-text-primary"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
        
        <div className="relative">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            multiple
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Button className="w-full bg-estate-purple hover:bg-estate-purple-dark text-white shadow-button">
            <Upload size={16} className="mr-2" />
            Dokumente hochladen
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="flex-1 overflow-y-auto p-4">
          {documents.length === 0 ? (
            <div className="text-center py-8">
              <FileText size={48} className="mx-auto text-estate-text-secondary mb-3 opacity-50" />
              <p className="text-sm text-estate-text-secondary">
                Noch keine Dokumente hochgeladen
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs font-medium text-estate-text-secondary uppercase tracking-wider mb-3">
                Als Kontext nutzen
              </div>
              
              {documents.map((doc) => (
                <Card key={doc.id} className="p-3 border-estate-border hover:shadow-card transition-smooth">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={doc.selected}
                      onCheckedChange={(checked) => 
                        onDocumentSelect(doc.id, checked as boolean)
                      }
                      className="mt-0.5 border-estate-border data-[state=checked]:bg-estate-purple data-[state=checked]:border-estate-purple"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-2">
                        <FileText size={16} className="text-estate-purple-dark mt-0.5 flex-shrink-0" />
                        <h3 className="text-sm font-medium text-estate-text-primary leading-tight truncate">
                          {doc.name}
                        </h3>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-estate-text-secondary">
                          <HardDrive size={12} />
                          <span>{doc.size}</span>
                        </div>
                        
                        <div className="flex items-center gap-1.5 text-xs text-estate-text-secondary">
                          <Calendar size={12} />
                          <span>
                            {doc.uploadDate.toLocaleDateString('de-DE', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}