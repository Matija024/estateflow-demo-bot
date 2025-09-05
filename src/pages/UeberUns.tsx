import { Header } from "@/components/Header";

const UeberUns = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-estate-bg-primary to-white">
      <Header />
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="text-center max-w-3xl mx-auto space-y-10">
          {/* Überschrift */}
          <h1 className="text-5xl font-extrabold text-estate-text-primary tracking-tight drop-shadow-sm">
            Über uns
          </h1>

          {/* Einleitung */}
          <p className="text-xl leading-relaxed text-estate-text-secondary">
            Prism as a Service – Gemeinsam die Zukunft gestalten<br />
            Wir sind ein Konsortium von 20 führenden Immobilienunternehmen, die sich zusammengeschlossen haben, 
            um das Asset Management neu zu definieren. Unser Ziel: die Entwicklung von KI-nativen Organisationen, 
            in denen Geschäftsprozesse nicht nur digitalisiert, sondern von Grund auf durch Künstliche Intelligenz gesteuert werden.
          </p>

          {/* Infobox */}
          <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-indigo-600 rounded-l-2xl"></div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Mit Prism as a Service schaffen wir eine Plattform, die kontinuierlich wächst: 
              Jedes Mitglied entwickelt eigene Module und Lösungen, die wie in einem App Store 
              allen Partnern zur Verfügung stehen. So entsteht ein dynamisches Ökosystem,
              das wir gemeinsam weiterentwickeln – mit einem klaren Anspruch: die Marktführerschaft 
              auszubauen und die Immobilienwirtschaft in eine smarte, agile und zukunftsfähige Ära zu führen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UeberUns;
