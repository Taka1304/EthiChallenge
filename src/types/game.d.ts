type GamePhase = "normal" | "matching" | "game" | "result" | "finalResult";

type GameLevel = "かんたん" | "ふつう" | "むずかしい";

type Option = {
  level: GameLevel;
  gameCount: number;
};

type Evaluation = 'theoreticalJudgement' | 'moralReasoning' | 'empathy' | 'socialResponsibility' | 'selfKnowledge' | 'total';

type Feedbacks = {
  [key in Evaluation]: string;
};

type Scores = {
  [key in Evaluation]: number;
};

type Player = {
  id: string; // Socket.id
  avatar: string;
  name: string;
  scores: Scores[];
  answers: string[];
  feedbacks: Feedbacks[];
  ready: boolean;
  isHost: boolean;
};

type Room = {
  id: string;
  hostName: string;
  phrase: string;
  players: Player[];
  questions: string[];
  options: Option;
};
