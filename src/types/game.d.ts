type GamePhase =
  | "matching"
  | "waiting"
  | "answer"
  | "scoring"
  | "result"
  | "finalResult"
  | "normal";

type GameLevel = "かんたん" | "ふつう" | "むずかしい";

type Option = {
  level: GameLevel;
  gameCount: number;
};

type Player = {
  id: string; // Socket.id
  avatar: string;
  name: string;
  scores: number[];
  answers: string[];
  ready: boolean;
  isHost: boolean;
};
