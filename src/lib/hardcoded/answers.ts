export interface HardcodedAnswer {
  answer: string;
  sources: Array<{
    title: string;
    docId: string;
    page?: number;
  }>;
  thinkingSequence?: string[];
}

interface AnswerPattern {
  keywords: string[];
  answer: HardcodedAnswer;
}

const answerPatterns: AnswerPattern[] = [
  {
    keywords: ["überblick", "immobilie", "grundlagen", "was ist"],
    answer: {
      answer: "Eine Immobilie ist ein unbeweglicher Vermögenswert, der aus Grund und Boden sowie darauf errichteten Gebäuden besteht. Immobilien lassen sich grundsätzlich in verschiedene Kategorien unterteilen: Wohnimmobilien (Einfamilienhäuser, Mehrfamilienhäuser, Eigentumswohnungen), Gewerbeimmobilien (Bürogebäude, Einzelhandelsflächen, Industrieimmobilien) und Sonderimmobilien (Hotels, Pflegeheime, Logistikzentren). Der Wert einer Immobilie hängt von verschiedenen Faktoren ab: Lage, Zustand, Ausstattung, Marktentwicklung und rechtliche Gegebenheiten.",
      sources: [
        { title: "Immobilien-Grundlagen.pdf", docId: "doc_1", page: 3 },
        { title: "Marktanalyse_2024.pdf", docId: "doc_2", page: 12 }
      ],
      thinkingSequence: ["Analysiere Dokument...", "Suche relevante Passagen zu Immobilien-Grundlagen...", "Strukturiere Antwort..."]
    }
  },
  {
    keywords: ["mietvertrag", "miete", "vermieter", "mieter"],
    answer: {
      answer: "Ein Mietvertrag ist ein Gebrauchsüberlassungsvertrag zwischen Vermieter und Mieter. Wichtige Bestandteile sind: die genaue Bezeichnung der Mietsache, Miethöhe und Nebenkosten, Kündigungsfristen, Schönheitsreparaturen und Hausordnung. Die Miete setzt sich zusammen aus der Kaltmiete (Grundmiete) und den Nebenkosten (Betriebskosten). Bei Wohnraummietverträgen gelten besondere Schutzbestimmungen zugunsten des Mieters, wie die Mietpreisbremse in angespannten Wohnungsmärkten oder Kündigungsschutz.",
      sources: [
        { title: "Mietrecht_Handbuch.pdf", docId: "doc_3", page: 8 },
        { title: "Nebenkosten_Übersicht.pdf", docId: "doc_4", page: 2 }
      ],
      thinkingSequence: ["Durchsuche Mietrecht-Dokumentation...", "Extrahiere relevante Vertragsklauseln...", "Fasse rechtliche Aspekte zusammen..."]
    }
  },
  {
    keywords: ["risiken", "risiko", "gefahr", "vorsicht"],
    answer: {
      answer: "Bei Immobilieninvestitionen bestehen verschiedene Risiken: Marktrisiko (Wertverluste durch Marktentwicklung), Leerstandsrisiko (ausbleibende Mieteinnahmen), Zinsänderungsrisiko (bei Finanzierung), Instandhaltungsrisiko (unvorhergesehene Reparaturen), rechtliche Risiken (Änderungen der Gesetzgebung) und Liquiditätsrisiko (schwierige Veräußerbarkeit). Zur Risikominimierung empfiehlt sich eine gründliche Standortanalyse, professionelle Bewertung, ausreichende Eigenkapitalquote und Diversifikation des Portfolios.",
      sources: [
        { title: "Risikoanalyse_Immobilien.pdf", docId: "doc_5", page: 15 },
        { title: "Investitionsstrategien.pdf", docId: "doc_6", page: 22 }
      ],
      thinkingSequence: ["Analysiere Risikofaktoren...", "Bewerte Marktdaten...", "Erstelle Risikoübersicht..."]
    }
  },
  {
    keywords: ["geschäftsplan", "business plan", "strategie", "planung"],
    answer: {
      answer: "Ein Immobilien-Geschäftsplan sollte folgende Kernelemente enthalten: Marktanalyse und Zielgruppendefinition, Finanzplanung mit Cashflow-Prognosen, Investitionsstrategie und Portfolio-Aufbau, Marketing- und Vertriebskonzept, Risikomanagement und Exit-Strategien. Wichtige Kennzahlen sind: Eigenkapitalrendite, Bruttorendite, Nettomietrendite, Debt-Service-Coverage-Ratio und Loan-to-Value. Der Plan sollte verschiedene Szenarien (Best Case, Worst Case, Realistic Case) berücksichtigen und regelmäßig überprüft werden.",
      sources: [
        { title: "Businessplan_Template.pdf", docId: "doc_7", page: 1 },
        { title: "Kennzahlen_Immobilien.pdf", docId: "doc_8", page: 7 }
      ],
      thinkingSequence: ["Suche Geschäftsplan-Vorlagen...", "Analysiere Finanzmodelle...", "Strukturiere Planungsvorlage..."]
    }
  },
  {
    keywords: ["neuvermietungsbedarf", "bad homburg", "vermietung", "objekte", "leerstand"],
    answer: {
      answer: "## 📊 **Analyse-Ergebnisse: Neuvermietungsbedarf Bad Homburg**\n\n**Kernerkenntnisse:**\n• **Leerstandsprognose:** 7.800 m² Gesamtleerstand identifiziert, finaler Leerstand 4,8% nach Neuvermietung\n• **Lead-Generierung:** 47 qualifizierte Interessenten generiert, 12 Besichtigungstermine vereinbart\n• **Mietersegmentierung:** 3 Hauptzielgruppen identifiziert mit spezifischen Ansprachestrategien\n• **Markterschließung:** Neue Vertriebskanäle erschlossen, Vermietungsgeschwindigkeit um 35% optimiert\n\n**Handlungsempfehlung:** Sofortige Umsetzung der Leadgenerierungs-Kampagne und Terminkoordinierung für die identifizierten Interessenten.",
      sources: [
        { title: "SAP ERP - Mieterdatenbank", docId: "sap_system"},
        { title: "Propstack - Immobilien-Management", docId: "propstack_system", page: 1 },
        { title: "Vertragsmatrix_Q1.xlsx", docId: "doc_9", page: 1 },
        { title: "Mieter_Segmente_2025.xlsx", docId: "doc_10", page: 3 },
        { title: "OutreachTool - Leadgenerierung", docId: "outreach_system", page: 1 },
        { title: "SurveyTool - Marktanalyse", docId: "survey_system", page: 1 },
        { title: "MaklerCRM - Terminverwaltung", docId: "crm_system", page: 1 }
      ],
      thinkingSequence: ["Initialisiere Multi-Agent-System...", "Starte Vertragsanalyse...", "Beginne Mietersegmentierung..."]
    }
  }
];

export function getHardcodedAnswer(message: string): HardcodedAnswer | null {
  const normalizedMessage = message.toLowerCase();
  
  for (const pattern of answerPatterns) {
    if (pattern.keywords.some(keyword => normalizedMessage.includes(keyword))) {
      return pattern.answer;
    }
  }
  
  return null;
}

export function addHardcodedPattern(keywords: string[], answer: HardcodedAnswer): void {
  answerPatterns.push({
    keywords: keywords.map(k => k.toLowerCase()),
    answer
  });
}