export interface Card {
  id: string;
  keyword: string;
  description: string;
  starFocus: boolean;
  wrongCount: number;
  bestTime: number;
}

export type EndTimeDisplay = "around" | "linear" | "count" | "hidden";

export interface Learning {
  at: number; // -1 means not learning or done learning
  set: string[];
  wrongSet: string[];
  // Learn options
  randomized: boolean;
  flipped: boolean;
  starFocused: boolean;
  wrongRelearned: boolean;
  autoEndTimed: boolean;
  // Control options
  nextOnStar: boolean;
  nextOnWrong: boolean;
  onlySpace: boolean;
  // Visual options
  endTimeDisplay: EndTimeDisplay;
}

export interface Pack {
  id: string;
  name?: string;
  description?: string;
  card?: Card[];
  learning?: Learning;
  learnedTimes?: number;
  bestRecord?: number; // in seconds
  lastLearn?: string;
  timeSpent?: number; // in seconds
}

export const defaultPack: Pack = {
  id: "default",
  name: "",
  description: "",
  card: [],
  learning: {
    at: 0,
    set: [],
    wrongSet: [],
    randomized: false,
    flipped: false,
    starFocused: false,
    wrongRelearned: false,
    autoEndTimed: false,
    nextOnStar: false,
    nextOnWrong: false,
    onlySpace: false,
    endTimeDisplay: "hidden",
  },
  learnedTimes: 0,
  bestRecord: 0,
  lastLearn: "",
  timeSpent: 0,
};

export type UserLearningProgress = {
  packs: number;
  cards: number;
  learned: number;
  hours: number;
};
