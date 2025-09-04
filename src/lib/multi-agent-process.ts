export interface AgentStep {
  id: number;
  agent: string;
  type: 'thinking' | 'doing' | 'confirmation' | 'user_prompt';
  action: string;
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
    agent: "Mietvertrags-Analyseagent",
    type: "thinking",
    action: "Öffne Datenquellen – CAFM, ERP, Vertragsdatenbank – ziehe alle Mietverträge, erkenne Kündigungsfristen, Restlaufzeiten und potenzielle Risiken.",
    details: "Öffne Datenquellen – CAFM, ERP, Vertragsdatenbank – ziehe alle Mietverträge, erkenne Kündigungsfristen, Restlaufzeiten und potenzielle Risiken.",
    duration: 3000,
    icon: "🔍"
  },
  {
    id: 2,
    agent: "Mietvertrags-Analyseagent",
    type: "doing",
    action: "Vertragsmatrix erstellt – Mieter, Flächen, Laufzeiten und Risikolevel. Übergebe sie an Kategorisierungsagenten.",
    details: "Vertragsmatrix erstellt – Mieter, Flächen, Laufzeiten und Risikolevel. Übergebe sie an Kategorisierungsagenten.",
    duration: 2500,
    icon: "📊"
  },

  // 2. Kategorisierungs- & Priorisierungsagent
  {
    id: 3,
    agent: "Kategorisierungs- & Priorisierungsagent",
    type: "thinking",
    action: "Erstelle A- B- C- Analyse anhand Vertragsmatrix",
    details: "Erstelle A- B- C- Analyse anhand Vertragsmatrix",
    duration: 2800,
    icon: "🔍"
  },

  // 3. Interaktions & Datenerhebungsagent
  {
    id: 4,
    agent: "Interaktions & Datenerhebungsagent",
    type: "thinking",
    action: "Rückmeldung aggregiert --> Weiterleitung an Dashboard Agenten",
    details: "Rückmeldung aggregiert --> Weiterleitung an Dashboard Agenten",
    duration: 3200,
    icon: "🔍"
  },

  // 4. Dashboard- & Auswertungsagent
  {
    id: 5,
    agent: "Dashboard- & Auswertungsagent",
    type: "thinking",
    action: "Daten empfangen Dashboard erstellen: Vertragsinfos, Rückmeldungen, Kategorien.",
    details: "Daten empfangen Dashboard erstellen: Vertragsinfos, Rückmeldungen, Kategorien.",
    duration: 2600,
    icon: "🔍"
  },
  {
    id: 6,
    agent: "Dashboard- & Auswertungsagent",
    type: "doing",
    action: "Übersicht Mieter, Bedarfe, Risiken und Forecasts. Ampellogik (rot/gelb/grün). Weitergabe an Entscheidungsagenten",
    details: "Übersicht Mieter, Bedarfe, Risiken und Forecasts. Ampellogik (rot/gelb/grün). Weitergabe an Entscheidungsagenten",
    duration: 2400,
    icon: "📊"
  },

  // 5. Entscheidungsagent
  {
    id: 7,
    agent: "Entscheidungsagent",
    type: "thinking",
    action: "Prüfe Rückmeldungen und entscheide: Wer braucht ein Erweiterungsangebot? Wer kündigt bald und muss neu vermarktet werden? Wer will verlängern?",
    details: "Prüfe Rückmeldungen und entscheide: Wer braucht ein Erweiterungsangebot? Wer kündigt bald und muss neu vermarktet werden? Wer will verlängern?",
    duration: 3500,
    icon: "🔍"
  },
  {
    id: 8,
    agent: "Entscheidungsagent",
    type: "doing",
    action: "Konkrete Maßnahmenpakete abgeleitet, Weitergabe an Vermarktungs- und Neuakquise-Agenten.",
    details: "Konkrete Maßnahmenpakete abgeleitet, Weitergabe an Vermarktungs- und Neuakquise-Agenten.",
    duration: 2800,
    icon: "📊"
  },

  // 6. Firmenlistenagent
  {
    id: 9,
    agent: "Firmenlistenagent",
    type: "thinking",
    action: "Scanne Branchen- und Firmenverzeichnisse Region. Suche passende Unternehmen.",
    details: "Scanne Branchen- und Firmenverzeichnisse Region. Suche passende Unternehmen.",
    duration: 3000,
    icon: "🔍"
  },
  {
    id: 10,
    agent: "Firmenlistenagent",
    type: "doing",
    action: "Longlist potenzieller Mieter erstellt. Weitergabe an Ansprechpartner-Agenten.",
    details: "Longlist potenzieller Mieter erstellt. Weitergabe an Ansprechpartner-Agenten.",
    duration: 2200,
    icon: "📊"
  },

  // 7. Ansprechpartner-Identifikationsagent
  {
    id: 11,
    agent: "Ansprechpartner-Identifikationsagent",
    type: "thinking",
    action: "Recherchiere gezielt die richtigen Personen in den Firmen – Geschäftsführer, Immobilienverantwortliche oder HR-Leiter. Prüfe Profile auf LinkedIn, Websites und CRM-Daten.",
    details: "Recherchiere gezielt die richtigen Personen in den Firmen – Geschäftsführer, Immobilienverantwortliche oder HR-Leiter. Prüfe Profile auf LinkedIn, Websites und CRM-Daten.",
    duration: 3800,
    icon: "🔍"
  },
  {
    id: 12,
    agent: "Ansprechpartner-Identifikationsagent",
    type: "doing",
    action: "Hier ist die Kontaktliste mit Namen, Rollen und Matching Scores. Weitergabe an Ansprache-Agenten.",
    details: "Hier ist die Kontaktliste mit Namen, Rollen und Matching Scores. Weitergabe an Ansprache-Agenten.",
    duration: 2600,
    icon: "📊"
  },

  // 8. Ansprache- & Terminvereinbarungsagent
  {
    id: 13,
    agent: "Ansprache- & Terminvereinbarungsagent",
    type: "thinking",
    action: "Kontaktiere die priorisierten Ansprechpartner – per E-Mail, LinkedIn oder Telefon und nutze personalisierte Textbausteine und erinnere automatisch.",
    details: "Kontaktiere die priorisierten Ansprechpartner – per E-Mail, LinkedIn oder Telefon und nutze personalisierte Textbausteine und erinnere automatisch.",
    duration: 3400,
    icon: "🔍"
  },
  {
    id: 14,
    agent: "Ansprache- & Terminvereinbarungsagent",
    type: "doing",
    action: "Termine mit Interessenten vereinbart. Weitergabe an Makler-/Marketing-Agenten und Abschlussmanagement.",
    details: "Termine mit Interessenten vereinbart. Weitergabe an Makler-/Marketing-Agenten und Abschlussmanagement.",
    duration: 2400,
    icon: "📊"
  },

  // 9. Maklermanagement- & Netzwerksteuerungsagent
  {
    id: 15,
    agent: "Maklermanagement- & Netzwerksteuerungsagent",
    type: "thinking",
    action: "Steuere externe Makler und koordiniere Vertriebspartner",
    details: "Steuere externe Makler und koordiniere Vertriebspartner",
    duration: 2800,
    icon: "🔍"
  },
  {
    id: 16,
    agent: "Maklermanagement- & Netzwerksteuerungsagent",
    type: "doing",
    action: "Dokumentation Makler-Leads --> Rückspielen qualifizierter Kontakte in Pipeline.",
    details: "Dokumentation Makler-Leads --> Rückspielen qualifizierter Kontakte in Pipeline.",
    duration: 2200,
    icon: "📊"
  },

  // 10. Marketingmaßnahmen- & Sichtbarkeitsagent
  {
    id: 17,
    agent: "Marketingmaßnahmen- & Sichtbarkeitsagent",
    type: "thinking",
    action: "Sichtbarmachen Objekt: –Exposés, Anzeigen, Kampagnen und Plattform-Listings. Überwache Reichweite und Resonanz.",
    details: "Sichtbarmachen Objekt: –Exposés, Anzeigen, Kampagnen und Plattform-Listings. Überwache Reichweite und Resonanz.",
    duration: 3200,
    icon: "🔍"
  },
  {
    id: 18,
    agent: "Marketingmaßnahmen- & Sichtbarkeitsagent",
    type: "doing",
    action: "Flächen am Markt platziert, Sichtbarkeit für Zielgruppen. Ergebnisse Rückfluss an Akquise-Agenten.",
    details: "Flächen am Markt platziert, Sichtbarkeit für Zielgruppen. Ergebnisse Rückfluss an Akquise-Agenten.",
    duration: 2600,
    icon: "📊"
  },

  // 11. Abschlussmanagement- & Dokumentationsagent
  {
    id: 19,
    agent: "Abschlussmanagement- & Dokumentationsagent",
    type: "thinking",
    action: "Organisation der Verhandlungen, Aktualisierung Pipeline, Koordination Freigaben und Steuerung Vertragsprozess bis Unterschrift.",
    details: "Organisation der Verhandlungen, Aktualisierung Pipeline, Koordination Freigaben und Steuerung Vertragsprozess bis Unterschrift.",
    duration: 3600,
    icon: "🔍"
  },
  {
    id: 20,
    agent: "Abschlussmanagement- & Dokumentationsagent",
    type: "doing",
    action: "Abschluss ist dokumentiert, Schritte nachverfolgbar, Übergabe ins Facility Management vorbereitet.",
    details: "Abschluss ist dokumentiert, Schritte nachverfolgbar, Übergabe ins Facility Management vorbereitet.",
    duration: 2800,
    icon: "📊"
  },

  // 12. Interaktionsagent (Final)
  {
    id: 21,
    agent: "Interaktionsagent",
    type: "doing",
    action: "Neuvermietungsanalyse erfolgreich durchgeführt",
    details: "📊 Neuvermietungsanalyse erfolgreich durchgeführt. Soll ich für die Mieter der Kategorie B und C die nächsten Schritte automatisiert einleiten?",
    duration: 2000,
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