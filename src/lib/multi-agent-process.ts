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
    action: "Öffne Datenquellen – CAFM, ERP, Vertragsdatenbank",
    details: "Ich öffne jetzt die Datenquellen – CAFM, ERP, Vertragsdatenbank – und ziehe mir alle Mietverträge in ein einheitliches Schema. Ich erkenne Kündigungsfristen, Restlaufzeiten und potenzielle Risiken.",
    duration: 3200,
    icon: "🔍"
  },
  {
    id: 2,
    agent: "Mietvertrags-Analyseagent",
    type: "doing",
    action: "Erstelle Vertragsmatrix",
    details: "Ich habe die Vertragsmatrix erstellt – mit allen Mietern, Flächen, Laufzeiten und Risikoleveln. Ich übergebe sie an meinen Kollegen, den Kategorisierungsagenten.",
    duration: 2800,
    icon: "📊"
  },

  // 2. Kategorisierungs- & Priorisierungsagent
  {
    id: 3,
    agent: "Kategorisierungs- & Priorisierungsagent",
    type: "thinking",
    action: "Bewerte jeden Mieter nach Größe und Risiko",
    details: "Ich nehme die Vertragsmatrix und bewerte jeden Mieter: groß, mittel, klein – und wie riskant der Vertrag ist. Daraus leite ich A-, B- und C-Mieter ab.",
    duration: 3500,
    icon: "🔍"
  },
  {
    id: 4,
    agent: "Kategorisierungs- & Priorisierungsagent",
    type: "doing",
    action: "Segmentiere Mieter in Kategorien",
    details: "Meine Kategorisierung ist fertig: A-Mieter für persönliche Gespräche, B-Mieter für digitale Umfragen, C-Mieter nur Monitoring. Ich gebe die Liste an den Interaktionsagenten weiter.",
    duration: 2600,
    icon: "📊"
  },

  // 3. Interaktions- & Datenerhebungsagent
  {
    id: 5,
    agent: "Interaktions- & Datenerhebungsagent",
    type: "thinking",
    action: "Bereite zielgruppenspezifische Ansprache vor",
    details: "Ich gehe die Liste durch. Für die A-Mieter bereite ich Gesprächsleitfäden vor und plane Termine. Für B-Mieter versende ich digitale Umfragen. Für C-Mieter schicke ich kurze Status-Formulare.",
    duration: 3800,
    icon: "🔍"
  },
  {
    id: 6,
    agent: "Interaktions- & Datenerhebungsagent",
    type: "doing",
    action: "Sammle Mietrückmeldungen",
    details: "Ich habe die Rückmeldungen gesammelt: Manche Mieter brauchen mehr Fläche, manche weniger, andere bleiben stabil. Diese Daten gehen jetzt gesammelt an den Dashboard-Agenten.",
    duration: 3000,
    icon: "📊"
  },

  // USER PROMPT
  {
    id: 7,
    agent: "System",
    type: "user_prompt",
    action: "Benötige Ihre Eingabe",
    details: "Nachfrage mit zusätzlichen Dokumenten: Lieferung einer Liste mit Ansprechpartnern, Terminvorschlägen und zugehörige Gesprächsleitfäden für Mieter der Kategorie A",
    duration: 0,
    icon: "❓",
    requiresUserInput: true,
    userPrompt: "Möchten Sie die Liste mit Ansprechpartnern, Terminvorschlägen und Gesprächsleitfäden für A-Mieter jetzt erhalten? (ja/nein)"
  },

  // CONFIRMATION
  {
    id: 8,
    agent: "System",
    type: "confirmation",
    action: "Verarbeite Benutzerantwort",
    details: "Daten empfangen - arbeite nun mit den neuen Informationen weiter",
    duration: 1500,
    icon: "✅"
  },

  // 4. Dashboard- & Auswertungsagent
  {
    id: 9,
    agent: "Dashboard- & Auswertungsagent",
    type: "thinking",
    action: "Konsolidiere alle Daten im Dashboard",
    details: "Ich spiele alle Daten in mein Dashboard ein: Vertragsinfos, Rückmeldungen, Kategorien. Ich bereinige die Formate und verknüpfe alles miteinander.",
    duration: 3400,
    icon: "🔍"
  },
  {
    id: 10,
    agent: "Dashboard- & Auswertungsagent",
    type: "doing",
    action: "Erstelle Übersicht mit Ampellogik",
    details: "Hier sind die Ergebnisse: eine Übersicht mit allen Mietern, Bedarfen, Risiken und Forecasts. Ich markiere in Ampellogik (rot/gelb/grün). Diese Auswertung gebe ich an den Entscheidungsagenten weiter.",
    duration: 2900,
    icon: "📊"
  },

  // 5. Entscheidungsagent
  {
    id: 11,
    agent: "Entscheidungsagent",
    type: "thinking",
    action: "Analysiere Handlungsoptionen",
    details: "Ich prüfe die Rückmeldungen und entscheide: Wer braucht ein Erweiterungsangebot? Wer kündigt bald und muss neu vermarktet werden? Wer will verlängern?",
    duration: 4000,
    icon: "🔍"
  },
  {
    id: 12,
    agent: "Entscheidungsagent",
    type: "doing",
    action: "Entwickle Maßnahmenpakete",
    details: "Ich habe konkrete Maßnahmenpakete abgeleitet und an die Vermarktungs- und Neuakquise-Agenten übergeben.",
    duration: 3200,
    icon: "📊"
  },

  // 6. Firmenlistenagent
  {
    id: 13,
    agent: "Firmenlistenagent",
    type: "thinking",
    action: "Durchsuche Unternehmensverzeichnisse",
    details: "Ich scanne Branchen- und Firmenverzeichnisse in der Region. Ich suche Unternehmen mit der richtigen Größe, Branche und Nähe zum Standort.",
    duration: 3600,
    icon: "🔍"
  },
  {
    id: 14,
    agent: "Firmenlistenagent",
    type: "doing",
    action: "Erstelle qualifizierte Longlist",
    details: "Ich habe eine Longlist potenzieller Mieter erstellt – sortiert nach Relevanz. Diese Liste gebe ich an den Ansprechpartner-Agenten weiter.",
    duration: 2700,
    icon: "📊"
  },

  // 7. Ansprechpartner-Identifikationsagent
  {
    id: 15,
    agent: "Ansprechpartner-Identifikationsagent",
    type: "thinking",
    action: "Recherchiere Entscheidungsträger",
    details: "Ich recherchiere gezielt die richtigen Personen in den Firmen – Geschäftsführer, Immobilienverantwortliche oder HR-Leiter. Ich prüfe Profile auf LinkedIn, Websites und CRM-Daten.",
    duration: 4200,
    icon: "🔍"
  },
  {
    id: 16,
    agent: "Ansprechpartner-Identifikationsagent",
    type: "doing",
    action: "Erstelle qualifizierte Kontaktliste",
    details: "Hier ist die Kontaktliste mit Namen, Rollen und Matching Scores. Ich gebe sie an den Ansprache-Agenten.",
    duration: 3100,
    icon: "📊"
  },

  // 8. Ansprache- & Terminvereinbarungsagent
  {
    id: 17,
    agent: "Ansprache- & Terminvereinbarungsagent",
    type: "thinking",
    action: "Entwickle personalisierte Ansprache-Strategie",
    details: "Ich kontaktiere die priorisierten Ansprechpartner – per E-Mail, LinkedIn oder Telefon. Ich nutze personalisierte Textbausteine und erinnere automatisch nach.",
    duration: 3800,
    icon: "🔍"
  },
  {
    id: 18,
    agent: "Ansprache- & Terminvereinbarungsagent",
    type: "doing",
    action: "Vereinbare Ersttermine",
    details: "Ich habe Termine mit Interessenten vereinbart. Diese leite ich an den Makler-/Marketing-Agenten und das Abschlussmanagement weiter.",
    duration: 2800,
    icon: "📊"
  },

  // 9. Maklermanagement- & Netzwerksteuerungsagent
  {
    id: 19,
    agent: "Maklermanagement- & Netzwerksteuerungsagent",
    type: "thinking",
    action: "Koordiniere externes Maklernetzwerk",
    details: "Ich steuere externe Makler: Wer darf welche Fläche vermarkten, wie ist die Performance, wo gibt es Doppelansprachen?",
    duration: 3300,
    icon: "🔍"
  },
  {
    id: 20,
    agent: "Maklermanagement- & Netzwerksteuerungsagent",
    type: "doing",
    action: "Optimiere Makler-Pipeline",
    details: "Ich dokumentiere alle Makler-Leads, bewerte die Partner und spiele qualifizierte Kontakte in die Pipeline zurück.",
    duration: 2600,
    icon: "📊"
  },

  // 10. Marketingmaßnahmen- & Sichtbarkeitsagent
  {
    id: 21,
    agent: "Marketingmaßnahmen- & Sichtbarkeitsagent",
    type: "thinking",
    action: "Entwickle umfassende Marketing-Strategie",
    details: "Ich mache das Objekt sichtbar – mit Exposés, Anzeigen, Kampagnen und Plattform-Listings. Ich überwache Reichweite und Resonanz.",
    duration: 3700,
    icon: "🔍"
  },
  {
    id: 22,
    agent: "Marketingmaßnahmen- & Sichtbarkeitsagent",
    type: "doing",
    action: "Implementiere Marktpräsenz",
    details: "Die Flächen sind am Markt platziert, mit gezielter Sichtbarkeit für die Zielgruppen. Ergebnisse fließen zurück an die Akquise-Agenten.",
    duration: 2900,
    icon: "📊"
  },

  // 11. Abschlussmanagement- & Dokumentationsagent
  {
    id: 23,
    agent: "Abschlussmanagement- & Dokumentationsagent",
    type: "thinking",
    action: "Orchestriere Vertragsverhandlungen",
    details: "Ich organisiere die Verhandlungen, halte die Pipeline aktuell, koordiniere Freigaben und steuere den Vertragsprozess bis zur Unterschrift.",
    duration: 3900,
    icon: "🔍"
  },
  {
    id: 24,
    agent: "Abschlussmanagement- & Dokumentationsagent",
    type: "doing",
    action: "Finalisiere Vertragsabschlüsse",
    details: "Der Abschluss ist dokumentiert, alle Schritte sind nachverfolgbar, und die Übergabe ins Facility Management ist vorbereitet.",
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