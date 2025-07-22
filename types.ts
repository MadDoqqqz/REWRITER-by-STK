
export enum Tool {
  PARAPHRASE = 'paraphrase',
  AI_DETECT = 'ai-detect',
  ESSAY_WRITER = 'essay-writer',
  SUMMARIZER = 'summarizer',
}

export enum ParaphraseMode {
  STANDARD = 'Standard',
  FLUENCY = 'Fluency',
  CREATIVE = 'Creative',
  FORMAL = 'Formal',
}

export enum EssayTone {
  PERSUASIVE = 'Persuasive',
  INFORMATIVE = 'Informative',
  NARRATIVE = 'Narrative',
  DESCRIPTIVE = 'Descriptive',
}

export enum EssayLength {
  SHORT = '300 words',
  MEDIUM = '500 words',
  LONG = '1000 words',
}

export enum SummaryLength {
    SHORT = 'a short',
    MEDIUM = 'a medium-length',
    LONG = 'a detailed'
}

export interface AiDetectionResult {
    ai_probability: number;
    suspicious_sentences: string[];
}
