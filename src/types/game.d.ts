// game → playing にしよう
type GamePhase = "normal" | "matching" | "game" | "result" | "finalResult";
// TODO: 英語にする
type GameLevel = "Easy" | "Normal" | "Hard";

type Option = {
  level: GameLevel;
  gameCount: number;
};

type Evaluation =
  "theoreticalJudgement" // 倫理的判断力
  | "moralReasoning"  // 道徳的推論力
  | "empathy" // 共感力
  | "socialResponsibility" // 社会的責任感
  | "selfKnowledge" // 自己認識
  | "total"; // 合計

type Feedbacks = Omit<{
  [key in Evaluation]: string;
}, "total">;

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
  phase: GamePhase;
  players: Player[];
  questions: string[];
  options: Option;
};
