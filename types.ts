
export interface ExplanationState {
  topic: string;
  result: string | null;
  loading: boolean;
  error: string | null;
}

export enum SimplificationLevel {
  KINDERGARTEN = '5 Year Old',
  GOLDEN_RETRIEVER = 'Golden Retriever',
  EMOJI_ONLY = 'Emojis Only',
  STORY_TIME = 'Bedtime Story'
}
