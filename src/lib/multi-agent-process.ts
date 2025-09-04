export interface AgentStep {
  id: number;
  agent: string;
  type: 'thinking' | 'doing';
  action: string;
  details: string;
  duration: number; // milliseconds
  icon: string;
}

export const BAD_HOMBURG_PROCESS: AgentStep[] = [
  {
    id: 1,
    agent: "Agent 1 – Mietvertrags-Analyseagent",
    type: "thinking",
    action: "Analysiere Mietvertrag_Alpha_Tower_2019.pdf",
    details: "Extrahiert Laufzeit, Miete und Sonderkündigungsrechte",
    duration: 3000,
    icon: "🟢"
  },
  {
    id: 2,
    agent: "Agent 1 – Mietvertrags-Analyseagent",
    type: "doing",
    action: "Markiere 12 Verträge mit Kündigungsoptionen",
    details: "Kündigungsoptionen < 12 Monate in Vertragsmatrix_Q1.xlsx",
    duration: 2500,
    icon: "🔵"
  },
  {
    id: 3,
    agent: "Agent 1B – Kategorisierungs- & Priorisierungsagent",
    type: "thinking",
    action: "Prüfe Matrix mit 87 Mietern gegen Portfolio-Regeln",
    details: "Vergleicht Flächenkategorien und nutzt Daten von Agent 1",
    duration: 3500,
    icon: "🟢"
  },
  {
    id: 4,
    agent: "Agent 1B – Kategorisierungs- & Priorisierungsagent",
    type: "doing",
    action: "Segmentiere Mieter in Kategorien A, B, C",
    details: "23 Mieter in A, 42 in B und 22 in C → Mieter_Segmente_2025.xlsx",
    duration: 2800,
    icon: "🔵"
  },
  {
    id: 5,
    agent: "Agent 3 – Interaktions- & Datenerhebungsagent",
    type: "thinking",
    action: "Erstelle Fragenblöcke für A-Mieter",
    details: "Entwickelt Umfragen für B- und C-Mieter basierend auf Segmentdaten",
    duration: 3200,
    icon: "🟢"
  },
  {
    id: 6,
    agent: "Agent 3 – Interaktions- & Datenerhebungsagent",
    type: "doing",
    action: "Versende 65 personalisierte Umfrage-Links",
    details: "Distribution via SurveyTool an alle Mieter-Segmente",
    duration: 2600,
    icon: "🔵"
  },
  {
    id: 7,
    agent: "Agent 3 – Interaktions- & Datenerhebungsagent",
    type: "thinking",
    action: "Verarbeite 41 Rückmeldungen",
    details: "Analysiert Feedback: 3.200 m² Erweiterung bei Beta AG identifiziert",
    duration: 4000,
    icon: "🟢"
  },
  {
    id: 8,
    agent: "Agent 4 – Dashboard- & Auswertungsagent",
    type: "doing",
    action: "Konsolidiere Rückläufe in Dashboard",
    details: "Vermietungs_Dashboard.pbix zeigt freie Flächen ab Juli: 12.500 m²",
    duration: 3000,
    icon: "🔵"
  },
  {
    id: 9,
    agent: "Agent 4 – Dashboard- & Auswertungsagent",
    type: "thinking",
    action: "Erstelle Leerstand-Forecast",
    details: "Prognose: 7.800 m² Leerstand in Q3 basierend auf aktuellen Daten",
    duration: 3500,
    icon: "🟢"
  },
  {
    id: 10,
    agent: "Agent 5 – Entscheidungsagent",
    type: "thinking",
    action: "Simuliere Szenarien für Flächenmanagement",
    details: "Bewerte Optionen: Verlängern, Freigeben, Neuvermieten",
    duration: 4200,
    icon: "🟢"
  },
  {
    id: 11,
    agent: "Agent 5 – Entscheidungsagent",
    type: "doing",
    action: "Erstelle Maßnahmenplan für 18 Flächen",
    details: "Konkrete Vorschläge in Maßnahmenplan_2025.docx dokumentiert",
    duration: 2900,
    icon: "🔵"
  },
  {
    id: 12,
    agent: "Agent 6 – Firmenlistenagent",
    type: "thinking",
    action: "Recherchiere potenzielle Neumieter",
    details: "Durchsucht Unternehmensregister_DE nach Firmen >200 Mitarbeitern",
    duration: 3800,
    icon: "🟢"
  },
  {
    id: 13,
    agent: "Agent 6 – Firmenlistenagent",
    type: "doing",
    action: "Erstelle Longlist mit 146 Firmen",
    details: "Qualifizierte Unternehmen in Neumieter_Liste.xlsx erfasst",
    duration: 2400,
    icon: "🔵"
  },
  {
    id: 14,
    agent: "Agent 7 – Ansprechpartner-Identifikationsagent",
    type: "thinking",
    action: "Durchsuche LinkedIn-Profile und Handelsregister",
    details: "Identifiziert Entscheidungsträger bei 146 Zielunternehmen",
    duration: 5000,
    icon: "🟢"
  },
  {
    id: 15,
    agent: "Agent 7 – Ansprechpartner-Identifikationsagent",
    type: "doing",
    action: "Erfasse 278 Ansprechpartner",
    details: "CFO Gamma GmbH und weitere in Kontaktmatrix.xlsx eingetragen",
    duration: 3200,
    icon: "🔵"
  },
  {
    id: 16,
    agent: "Agent 8 – Ansprache- & Terminvereinbarungsagent",
    type: "thinking",
    action: "Entwickle 87 personalisierte Anschreiben",
    details: "Bezugnahme auf individuelle Expansionspläne der Unternehmen",
    duration: 4500,
    icon: "🟢"
  },
  {
    id: 17,
    agent: "Agent 8 – Ansprache- & Terminvereinbarungsagent",
    type: "doing",
    action: "Verschicke Nachrichten und vereinbare Termine",
    details: "OutreachTool-Kampagne resultiert in 12 bestätigten Erstterminen",
    duration: 3100,
    icon: "🔵"
  },
  {
    id: 18,
    agent: "Agent 9 – Maklermanagement-Agent",
    type: "doing",
    action: "Beauftrage 3 externe Makler",
    details: "Spezialflächen >1.500 m² an Experten vergeben, MaklerCRM synchronisiert",
    duration: 2700,
    icon: "🔵"
  },
  {
    id: 19,
    agent: "Agent 10 – Marketingmaßnahmen-Agent",
    type: "thinking",
    action: "Analysiere Keywords und Suchvolumen",
    details: "1.240 Suchanfragen für 'Bürofläche München' identifiziert",
    duration: 3600,
    icon: "🟢"
  },
  {
    id: 20,
    agent: "Agent 10 – Marketingmaßnahmen-Agent",
    type: "doing",
    action: "Schalte Inserate auf Immobilienscout24",
    details: "4 Anzeigen live, LinkedIn Ads erwarten 25.000 Impressions",
    duration: 2800,
    icon: "🔵"
  },
  {
    id: 21,
    agent: "Agent 11 – Abschlussmanagement-Agent",
    type: "thinking",
    action: "Prüfe Vertragsentwürfe gegen Standards",
    details: "Mietvertrag_BetaAG_2025.docx mit Standardklauseln abgeglichen",
    duration: 3400,
    icon: "🟢"
  },
  {
    id: 22,
    agent: "Agent 11 – Abschlussmanagement-Agent",
    type: "doing",
    action: "Organisiere digitale Signatur",
    details: "DocuSign-Prozess eingeleitet, Vertrag in DMS_Abschlüsse_2025 archiviert",
    duration: 2500,
    icon: "🔵"
  },
  {
    id: 23,
    agent: "Agent 4 – Dashboard- & Auswertungsagent",
    type: "doing",
    action: "Aktualisiere Portfolio-Cockpit",
    details: "Leerstand sinkt auf 4,8%, Quartalsbericht_Vermietung_Q2.pdf erstellt",
    duration: 3000,
    icon: "🔵"
  }
];

export async function runMultiAgentProcess(
  onStepUpdate: (step: AgentStep) => void,
  onComplete: () => void
): Promise<void> {
  for (const step of BAD_HOMBURG_PROCESS) {
    onStepUpdate(step);
    await new Promise(resolve => setTimeout(resolve, step.duration));
  }
  onComplete();
}