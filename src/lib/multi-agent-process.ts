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
  // Mietvertrags-Analyseagent
  {
    id: 1,
    agent: "Mietvertrags-Analyseagent",
    type: "thinking",
    action: "Öffne Datenquellen – CAFM, ERP, Vertragsdatenbank",
    details: "Ziehe alle Mietverträge in einheitliches Schema. Erkenne Kündigungsfristen, Restlaufzeiten und potenzielle Risiken.",
    duration: 3200,
    icon: "🔍"
  },
  {
    id: 2,
    agent: "Mietvertrags-Analyseagent", 
    type: "doing",
    action: "Erstelle Vertragsmatrix",
    details: "Vertragsmatrix erstellt – alle Mieter, Flächen, Laufzeiten und Risikolevel dokumentiert. Übergabe an Kategorisierungsagent.",
    duration: 2800,
    icon: "📊"
  },

  // Kategorisierungs- & Priorisierungsagent
  {
    id: 3,
    agent: "Kategorisierungs- & Priorisierungsagent",
    type: "thinking", 
    action: "Bewerte jeden Mieter nach Größe und Risiko",
    details: "Nehme Vertragsmatrix und bewerte jeden Mieter: groß, mittel, klein – und wie riskant der Vertrag ist. Leite A-, B- und C-Mieter ab.",
    duration: 3500,
    icon: "🔍"
  },
  {
    id: 4,
    agent: "Kategorisierungs- & Priorisierungsagent",
    type: "doing",
    action: "Segmentiere Mieter in Kategorien",
    details: "Kategorisierung abgeschlossen: A-Mieter für persönliche Gespräche, B-Mieter für digitale Umfragen, C-Mieter nur Monitoring. Liste übergeben.",
    duration: 2600,
    icon: "📊"
  },

  // Interaktions- & Datenerhebungsagent  
  {
    id: 5,
    agent: "Interaktions- & Datenerhebungsagent",
    type: "thinking",
    action: "Bereite zielgruppenspezifische Ansprache vor",
    details: "Gehe Liste durch. Für A-Mieter bereite ich Gesprächsleitfäden vor und plane Termine. Für B-Mieter versende ich digitale Umfragen. Für C-Mieter schicke ich kurze Status-Formulare.",
    duration: 3800,
    icon: "🔍"
  },
  {
    id: 6,
    agent: "Interaktions- & Datenerhebungsagent",
    type: "doing", 
    action: "Sammle Mietrückmeldungen",
    details: "Rückmeldungen gesammelt: Flächenbedarf ermittelt – manche brauchen mehr, manche weniger, andere bleiben stabil. Daten bereit für Dashboard-Agent.",
    duration: 3000,
    icon: "📊"
  },

  // Benutzerabfrage
  {
    id: 7,
    agent: "System",
    type: "user_prompt",
    action: "Benötige Ihre Eingabe",
    details: "Möchten Sie die Ansprechpartner, Terminvorschläge und Gesprächsleitfäden für A-Mieter jetzt überprüfen?",
    duration: 0,
    icon: "❓",
    requiresUserInput: true,
    userPrompt: "Möchten Sie die Ansprechpartner, Terminvorschläge und Gesprächsleitfäden für A-Mieter jetzt überprüfen? (ja/nein)"
  },

  // Bestätigungsnachricht
  {
    id: 8,
    agent: "System", 
    type: "confirmation",
    action: "Verarbeite Benutzerantwort",
    details: "Daten empfangen - arbeite nun mit den neuen Informationen weiter",
    duration: 1500,
    icon: "✅"
  },

  // Dashboard- & Auswertungsagent
  {
    id: 9,
    agent: "Dashboard- & Auswertungsagent",
    type: "thinking",
    action: "Konsolidiere alle Daten im Dashboard", 
    details: "Spiele alle Daten ins Dashboard ein: Vertragsinfos, Rückmeldungen, Kategorien. Bereinige Formate und verknüpfe alles miteinander.",
    duration: 3400,
    icon: "🔍"
  },
  {
    id: 10,
    agent: "Dashboard- & Auswertungsagent",
    type: "doing",
    action: "Erstelle Übersicht mit Ampellogik",
    details: "Dashboard zeigt Übersicht: alle Mieter, Bedarfe, Risiken und Forecasts in Ampellogik (rot/gelb/grün). Auswertung an Entscheidungsagent übergeben.",
    duration: 2900,
    icon: "📊"
  },

  // Entscheidungsagent
  {
    id: 11,
    agent: "Entscheidungsagent",
    type: "thinking", 
    action: "Analysiere Handlungsoptionen",
    details: "Prüfe Rückmeldungen und entscheide: Wer braucht ein Erweiterungsangebot? Wer kündigt bald und muss neu vermarktet werden? Wer will verlängern?",
    duration: 4000,
    icon: "🔍"
  },
  {
    id: 12,
    agent: "Entscheidungsagent",
    type: "doing",
    action: "Entwickle Maßnahmenpakete", 
    details: "Konkrete Maßnahmenpakete abgeleitet und an Vermarktungs- und Neuakquise-Agenten übergeben. Strategische Empfehlungen dokumentiert.",
    duration: 3200,
    icon: "📊"
  },

  // Firmenlistenagent
  {
    id: 13,
    agent: "Firmenlistenagent",
    type: "thinking",
    action: "Durchsuche Unternehmensverzeichnisse",
    details: "Scanne Branchen- und Firmenverzeichnisse in der Region. Suche Unternehmen mit der richtigen Größe, Branche und Nähe zum Standort.",
    duration: 3600,
    icon: "🔍"
  },
  {
    id: 14,
    agent: "Firmenlistenagent", 
    type: "doing",
    action: "Erstelle qualifizierte Longlist",
    details: "Longlist potenzieller Mieter erstellt – sortiert nach Relevanz. Liste mit Matching-Scores an Ansprechpartner-Identifikationsagent übergeben.",
    duration: 2700,
    icon: "📊"
  },

  // Ansprechpartner-Identifikationsagent
  {
    id: 15,
    agent: "Ansprechpartner-Identifikationsagent",
    type: "thinking",
    action: "Recherchiere Entscheidungsträger", 
    details: "Recherchiere gezielt die richtigen Personen in den Firmen – Geschäftsführer, Immobilienverantwortliche oder HR-Leiter. Prüfe Profile auf LinkedIn, Websites und CRM-Daten.",
    duration: 4200,
    icon: "🔍"
  },
  {
    id: 16,
    agent: "Ansprechpartner-Identifikationsagent",
    type: "doing",
    action: "Erstelle qualifizierte Kontaktliste",
    details: "Kontaktliste mit Namen, Rollen und Matching Scores erstellt. Qualifizierte Ansprechpartner an Ansprache- & Terminvereinbarungsagent übergeben.",
    duration: 3100,
    icon: "📊"
  },

  // Ansprache- & Terminvereinbarungsagent
  {
    id: 17,
    agent: "Ansprache- & Terminvereinbarungsagent", 
    type: "thinking",
    action: "Entwickle personalisierte Ansprache-Strategie",
    details: "Kontaktiere priorisierte Ansprechpartner – per E-Mail, LinkedIn oder Telefon. Nutze personalisierte Textbausteine und erinnere automatisch nach.",
    duration: 3800,
    icon: "🔍"
  },
  {
    id: 18,
    agent: "Ansprache- & Terminvereinbarungsagent",
    type: "doing", 
    action: "Vereinbare Ersttermine",
    details: "Termine mit Interessenten vereinbart. Termine und qualifizierte Leads an Maklermanagement-Agent und Abschlussmanagement weitergeleitet.",
    duration: 2800,
    icon: "📊"
  },

  // Maklermanagement- & Netzwerksteuerungsagent
  {
    id: 19,
    agent: "Maklermanagement- & Netzwerksteuerungsagent",
    type: "thinking",
    action: "Koordiniere externes Maklernetzwerk",
    details: "Steuere externe Makler: Wer darf welche Fläche vermarkten, wie ist die Performance, wo gibt es Doppelansprachen? Vermeide Überschneidungen.",
    duration: 3300,
    icon: "🔍"
  },
  {
    id: 20,
    agent: "Maklermanagement- & Netzwerksteuerungsagent", 
    type: "doing",
    action: "Optimiere Makler-Pipeline",
    details: "Makler-Leads dokumentiert, Partner bewertet und qualifizierte Kontakte in Pipeline zurückgespielt. Performance-Tracking aktiviert.",
    duration: 2600,
    icon: "📊"
  },

  // Marketingmaßnahmen- & Sichtbarkeitsagent  
  {
    id: 21,
    agent: "Marketingmaßnahmen- & Sichtbarkeitsagent",
    type: "thinking",
    action: "Entwickle umfassende Marketing-Strategie", 
    details: "Mache Objekt sichtbar – mit Exposés, Anzeigen, Kampagnen und Plattform-Listings. Überwache Reichweite und Resonanz der Maßnahmen.",
    duration: 3700,
    icon: "🔍"
  },
  {
    id: 22,
    agent: "Marketingmaßnahmen- & Sichtbarkeitsagent",
    type: "doing",
    action: "Implementiere Marktpräsenz", 
    details: "Flächen am Markt platziert mit gezielter Sichtbarkeit für Zielgruppen. Kampagnen-Performance und Ergebnisse an Akquise-Agenten übertragen.",
    duration: 2900,
    icon: "📊"
  },

  // Abschlussmanagement- & Dokumentationsagent
  {
    id: 23,
    agent: "Abschlussmanagement- & Dokumentationsagent",
    type: "thinking",
    action: "Orchestriere Vertragsverhandlungen",
    details: "Organisiere Verhandlungen, halte Pipeline aktuell, koordiniere Freigaben und steuere den Vertragsprozess bis zur Unterschrift.",
    duration: 3900,
    icon: "🔍"
  },
  {
    id: 24,
    agent: "Abschlussmanagement- & Dokumentationsagent",
    type: "doing",
    action: "Finalisiere Vertragsabschlüsse", 
    details: "Abschluss dokumentiert, alle Schritte nachverfolgbar und Übergabe ins Facility Management vorbereitet. Multi-Agent-Prozess erfolgreich abgeschlossen.",
    duration: 3000,
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