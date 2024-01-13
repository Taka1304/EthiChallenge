import { atom } from "jotai";
import { Socket } from "socket.io-client";

// グローバルな状態を管理するためのatomを定義
// atomはjotaiの機能で、状態を管理するためのもの

// 状態：WebSocketコネクション
export const socketAtom = atom(null as unknown as Socket);
// 状態：プレイヤーの状態
export const playerAtom = atom<Player>({
  id: "",
  avatar: "",
  name: "Player",
  feedbacks: [],
  scores: [],
  answers: [],
  ready: false,
  isHost: false,
});
// 状態：ゲームフェーズ

export const roomAtom = atom<Room>({
  id: "",
  hostName: "",
  phrase: "",
  phase: "normal",
  players: [
    {
      id: "",
      avatar: "",
      name: "Player",
      scores: [],
      feedbacks: [],
      answers: [],
      ready: false,
      isHost: false,
    },
  ],
  options: {
    level: "ふつう",
    gameCount: 3,
  },
  questions: [],
});
