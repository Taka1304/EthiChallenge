type GamePhase = "normal" | "matching" | "game" | "result" | "finalResult";

type GameLevel = "かんたん" | "ふつう" | "むずかしい";

type Option = {
  level: GameLevel;
  gameCount: number;
};

type Player = {
  id: string; // Socket.id
  avatar: string;
  name: string;
  scores: Scores[];
  answers: string[];
  ready: boolean;
  isHost: boolean;
};

type Scores = {
  theoreticalJudgement: number; // 論理的判断力
  moralReasoning: number; // 道徳的推論
  empathy: number; // 共感力
  socialResponsibility: number; // 社会的責任
  selfKnowledge: number; // 自己認識
  total: number; // 総合評価
};
