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


export function getHardcodedAnswer(message: string): HardcodedAnswer | null {
  return null;
}

export function addHardcodedPattern(keywords: string[], answer: HardcodedAnswer): void {
  // No longer needed - patterns removed
}