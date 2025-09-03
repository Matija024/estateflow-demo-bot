import { useState } from "react";
import { DocumentSidebar } from "@/components/DocumentSidebar";
import { ChatInterface } from "@/components/ChatInterface";
import { Header } from "@/components/Header";

interface Document {
  id: string;
  name: string;
  uploadDate: Date;
  type: string;
  selected: boolean;
}

const Index = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  
  const handleDocumentSelect = (docId: string, selected: boolean) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId ? { ...doc, selected } : doc
    ));
  };

  const handleUpload = (files: FileList) => {
    const newDocs: Document[] = Array.from(files).map(file => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      uploadDate: new Date(),
      type: file.type,
      selected: true
    }));
    
    setDocuments(prev => [...prev, ...newDocs]);
  };

  const selectedDocuments = documents.filter(doc => doc.selected).map(doc => doc.id);

  return (
    <div className="h-screen flex flex-col bg-estate-bg-primary">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <DocumentSidebar 
          documents={documents}
          onDocumentSelect={handleDocumentSelect}
          onUpload={handleUpload}
        />
        <div className="flex-1">
          <ChatInterface selectedDocuments={selectedDocuments} />
        </div>
      </div>
    </div>
  );
};

export default Index;
