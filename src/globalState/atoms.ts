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
  name: "",
  scores: [],
  answers: [],
  ready: false,
  isHost: false,
});
// 状態：ゲームフェーズ
export const gamePhaseAtom = atom<GamePhase>("normal");

export const roomAtom = atom<Room>({
  id: "",
  hostName: "",
  phrase: "",
  players: [
    {
      id: "",
      avatar: "",
      name: "",
      scores: [],
      answers: [],
      ready: false,
      isHost: false,
    },
  ],
  options: {
    level: "かんたん",
    gameCount: 3,
  },
});
