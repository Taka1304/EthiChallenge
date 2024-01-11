import { atom } from "jotai";
import { Socket } from "socket.io-client";

// グローバルな状態を管理するためのatomを定義
// atomはjotaiの機能で、状態を管理するためのもの

// 状態：WebSocketコネクション
export const socketAtom = atom(null as unknown as Socket);
// 状態：ユーザー名
export const userNameAtom = atom("");
// 状態：ゲームフェーズ
export const gamePhaseAtom = atom<GamePhase>("normal");
