import { Header } from "@/components/Header";

const UeberUns = () => {
  return (
    <div className="h-screen flex flex-col bg-estate-bg-primary">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-estate-text-primary mb-6">Über uns</h1>

          {/* Absätze statt \n */}
          <p className="text-lg text-estate-text-secondary mb-4">
            <strong>Prism as a Service – Gemeinsam die Zukunft gestalten</strong>
          </p>
          <p className="text-lg text-estate-text-secondary mb-4">
            Wir sind ein Konsortium von 20 führenden Immobilienunternehmen, die sich zusammengeschlossen haben, 
            um das Asset Management neu zu definieren. Unser Ziel: die Entwicklung von 
            <strong> KI-nativen Organisationen</strong>, in denen Geschäftsprozesse nicht nur digitalisiert, 
            sondern von Grund auf durch Künstliche Intelligenz gesteuert werden.
          </p>

          {/* Box */}
          <div className="bg-estate-bg-secondary rounded-lg p-6 shadow-card">
            <p className="text-estate-text-secondary">
              Mit Prism as a Service schaffen wir eine Plattform, die kontinuierlich wächst: 
              Jedes Mitglied entwickelt eigene Module und Lösungen, die wie in einem App Store 
              allen Partnern zur Verfügung stehen. So entsteht ein dynamisches Ökosystem, das wir gemeinsam 
              weiterentwickeln – mit einem klaren Anspruch: die <strong>Marktführerschaft auszubauen</strong> 
              und die Immobilienwirtschaft in eine smarte, agile und <strong>zukunftsfähige Ära</strong> zu führen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UeberUns;
