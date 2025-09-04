// Helper function to generate random duration between 3 and 4 seconds
const getRandomDuration = () => Math.floor(Math.random() * 1000) + 4000;

export interface AgentStep {
  id: number;
  agent: string;
  type: 'thinking' | 'doing' | 'confirmation' | 'user_prompt';
  details: string;
  duration: number; // milliseconds
  icon: string;
  requiresUserInput?: boolean;
  userPrompt?: string;
}

export const BAD_HOMBURG_PROCESS: AgentStep[] = [
  // 1. Mietvertrags-Analyseagent
  {
    id: 1,
    agent: "🤖 Mietvertrags-Analyseagent",
    type: "thinking",
    details: "Öffne Datenquellen – CAFM, ERP, Vertragsdatenbank – ziehe alle Mietverträge, erkenne Kündigungsfristen, Restlaufzeiten und potenzielle Risiken.",
    duration: getRandomDuration(),
    icon: "🔍"
  },
  {
    id: 2,
    agent: "🤖 Mietvertrags-Analyseagent",
    type: "doing",
    details: "Vertragsmatrix erstellt – Mieter, Flächen, Laufzeiten und Risikolevel. Übergebe sie an Kategorisierungsagenten.",
    duration: getRandomDuration(),
    icon: "📊"
  },

  // 2. Kategorisierungs- & Priorisierungsagent
  {
    id: 3,
    agent: "🤖 Kategorisierungs- & Priorisierungsagent",
    type: "thinking",
    details: "Erstelle A- B- C- Analyse anhand Vertragsmatrix",
    duration: 7000,
    icon: "🔍"
  },

  // 3. Interaktions & Datenerhebungsagent
  {
    id: 4,
    agent: "🤖 Interaktions & Datenerhebungsagent",
    type: "thinking",
    details: "Rückmeldung aggregiert --> Weiterleitung an Dashboard Agenten",
    duration: getRandomDuration(),
    icon: "🔍"
  },

  // 4. Dashboard- & Auswertungsagent
  {
    id: 5,
    agent: "🤖 Dashboard- & Auswertungsagent",
    type: "thinking",
    details: "Daten empfangen Dashboard erstellen: Vertragsinfos, Rückmeldungen, Kategorien.",
    duration: 7000,
    icon: "🔍"
  },
  {
    id: 6,
    agent: "🤖 Dashboard- & Auswertungsagent",
    type: "doing",
    details: "Übersicht Mieter, Bedarfe, Risiken und Forecasts. Ampellogik (rot/gelb/grün). Weitergabe an Entscheidungsagenten",
    duration: getRandomDuration(),
    icon: "📊"
  },

  // 5. Entscheidungsagent
  {
    id: 7,
    agent: "🤖 Entscheidungsagent",
    type: "thinking",
    details: "Prüfe Rückmeldungen und entscheide: Wer braucht ein Erweiterungsangebot? Wer kündigt bald und muss neu vermarktet werden? Wer will verlängern?",
    duration: getRandomDuration(),
    icon: "🔍"
  },
  {
    id: 8,
    agent: "🤖 Entscheidungsagent",
    type: "doing",
    details: "Konkrete Maßnahmenpakete abgeleitet, Weitergabe an Vermarktungs- und Neuakquise-Agenten.",
    duration: getRandomDuration(),
    icon: "📊"
  },

  // 6. Firmenlistenagent
  {
    id: 9,
    agent: "🤖 Firmenlistenagent",
    type: "thinking",
    details: "Scanne Branchen- und Firmenverzeichnisse Region. Suche passende Unternehmen.",
    duration: getRandomDuration(),
    icon: "🔍"
  },
  {
    id: 10,
    agent: "🤖 Firmenlistenagent",
    type: "doing",
    details: "Longlist potenzieller Mieter erstellt. Weitergabe an Ansprechpartner-Agenten.",
    duration: getRandomDuration(),
    icon: "📊"
  },

  // 7. Ansprechpartner-Identifikationsagent
  {
    id: 11,
    agent: "🤖 Ansprechpartner-Identifikationsagent",
    type: "thinking",
    details: "Recherchiere gezielt die richtigen Personen in den Firmen – Geschäftsführer, Immobilienverantwortliche oder HR-Leiter. Prüfe Profile auf LinkedIn, Websites und CRM-Daten.",
    duration: getRandomDuration(),
    icon: "🔍"
  },
  {
    id: 12,
    agent: "🤖 Ansprechpartner-Identifikationsagent",
    type: "doing",
    details: "Hier ist die Kontaktliste mit Namen, Rollen und Matching Scores. Weitergabe an Ansprache-Agenten.",
    duration: getRandomDuration(),
    icon: "📊"
  },

  // 8. Ansprache- & Terminvereinbarungsagent
  {
    id: 13,
    agent: "🤖 Ansprache- & Terminvereinbarungsagent",
    type: "thinking",
    details: "Kontaktiere die priorisierten Ansprechpartner – per E-Mail, LinkedIn oder Telefon und nutze personalisierte Textbausteine und erinnere automatisch.",
    duration: getRandomDuration(),
    icon: "🔍"
  },
  {
    id: 14,
    agent: "🤖 Ansprache- & Terminvereinbarungsagent",
    type: "doing",
    details: "Termine mit Interessenten vereinbart. Weitergabe an Makler-/Marketing-Agenten und Abschlussmanagement.",
    duration: getRandomDuration(),
    icon: "📊"
  },

  // 9. Maklermanagement- & Netzwerksteuerungsagent
  {
    id: 15,
    agent: "🤖 Maklermanagement- & Netzwerksteuerungsagent",
    type: "thinking",
    details: "Steuere externe Makler und koordiniere Vertriebspartner",
    duration: getRandomDuration(),
    icon: "🔍"
  },
  {
    id: 16,
    agent: "🤖 Maklermanagement- & Netzwerksteuerungsagent",
    type: "doing",
    details: "Dokumentation Makler-Leads --> Rückspielen qualifizierter Kontakte in Pipeline.",
    duration: getRandomDuration(),
    icon: "📊"
  },

  // 10. Marketingmaßnahmen- & Sichtbarkeitsagent
  {
    id: 17,
    agent: "🤖 Marketingmaßnahmen- & Sichtbarkeitsagent",
    type: "thinking",
    details: "Sichtbarmachen Objekt: –Exposés, Anzeigen, Kampagnen und Plattform-Listings. Überwache Reichweite und Resonanz.",
    duration: getRandomDuration(),
    icon: "🔍"
  },
  {
    id: 18,
    agent: "🤖 Marketingmaßnahmen- & Sichtbarkeitsagent",
    type: "doing",
    details: "Flächen am Markt platziert, Sichtbarkeit für Zielgruppen. Ergebnisse Rückfluss an Akquise-Agenten.",
    duration: getRandomDuration(),
    icon: "📊"
  },

  // 11. Abschlussmanagement- & Dokumentationsagent
  {
    id: 19,
    agent: "🤖 Abschlussmanagement- & Dokumentationsagent",
    type: "thinking",
    details: "Organisation der Verhandlungen, Aktualisierung Pipeline, Koordination Freigaben und Steuerung Vertragsprozess bis Unterschrift.",
    duration: getRandomDuration(),
    icon: "🔍"
  },
  {
    id: 20,
    agent: "🤖 Abschlussmanagement- & Dokumentationsagent",
    type: "doing",
    details: "Abschluss ist dokumentiert, Schritte nachverfolgbar, Übergabe ins Facility Management vorbereitet.",
    duration: getRandomDuration(),
    icon: "📊"
  },

  // 12. Interaktionsagent (Final)
  {
    id: 21,
    agent: "🤖 Interaktionsagent",
    type: "doing",
    details: "Neuvermietungsanalyse erfolgreich durchgeführt.\n\nSoll ich für die Mieter der Kategorie B und C die nächsten Schritte automatisiert einleiten?",
    duration: getRandomDuration(),
    icon: "📊"
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