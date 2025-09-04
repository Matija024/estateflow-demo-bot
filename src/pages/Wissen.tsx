import { Header } from "@/components/Header";

const Wissen = () => {
  return (
    <div className="h-screen flex flex-col bg-estate-bg-primary">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-estate-text-primary mb-6">Wissen</h1>
          <p className="text-lg text-estate-text-secondary mb-4">
            Unser Wissenszentrum wird bald verfügbar sein und tiefgreifende Einblicke in unser Projekt bieten.
          </p>
          <div className="bg-estate-bg-secondary rounded-lg p-6 shadow-card">
            <p className="text-estate-text-secondary">
              Hier werden Sie umfassende Ressourcen, Dokumentationen und Expertenwissen zu unserem Projekt finden.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wissen;