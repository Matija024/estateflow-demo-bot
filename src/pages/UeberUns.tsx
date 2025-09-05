import { Header } from "@/components/Header";

const UeberUns = () => {
  return (
    <div className="h-screen flex flex-col bg-estate-bg-primary">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-estate-text-primary mb-6">Über uns</h1>
          <p className="text-lg text-estate-text-secondary mb-4">
            Prism as a Service – Gemeinsam die Zukunft gestalten
Wir sind ein Konsortium von 20 führenden Immobilienunternehmen, die sich zusammengeschlossen haben, um das Asset Management neu zu definieren. Unser Ziel: die Entwicklung von KI-nativen Organisationen, in denen Geschäftsprozesse nicht nur digitalisiert, sondern von Grund auf durch Künstliche Intelligenz gesteuert werden.
          </p>
          <div className="bg-estate-bg-secondary rounded-lg p-6 shadow-card">
            <p className="text-estate-text-secondary">
              Hier finden Sie bald detaillierte Informationen über unsere Mission, Vision und das Team hinter EstateFlow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UeberUns;