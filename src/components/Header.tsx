import estateflowLogo from "@/assets/estateflow-logo.png";
export function Header() {
  return <header className="bg-estate-bg-secondary border-b border-estate-border px-6 py-4">
      <div className="flex items-center gap-3">
        <img src={estateflowLogo} alt="EstateFlow Logo" className="w-10 h-10 rounded-lg" />
        <h1 className="text-2xl font-bold text-estate-text-primary">Prism</h1>
      </div>
    </header>;
}