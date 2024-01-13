import type { NextApiRequest, NextApiResponse } from "next";
import cors from "cors";

import type { Socket as NetSocket } from "net";
import type { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import { setRoom } from "~/app/gameplay/_room";

// Next.jsの型定義を拡張してSocket.IOの型定義を追加
type ResponseWebSocket = NextApiResponse & {
  socket: NetSocket & { server: HttpServer & { io?: SocketServer } };
};

const corsMiddleware = cors();

// Next.jsのAPIルーティングの入り口となる関数
export default function SocketHandler(
  req: NextApiRequest,
  res: ResponseWebSocket,
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  if (res.socket.server.io) {
    return res.send("already-set-up");
  }
  // Socket.IOのサーバーを作成する
  const io = new SocketServer(res.socket.server, {
    addTrailingSlash: false,
  });

  // クライアントが接続してきたら、コネクションを確立する
  io.on("connection", (socket) => {
    const clientId = socket.id;
    console.log(`A client connected. ID: ${clientId}`);

    socket.on("createRoom", (data: CreateRoom) => {
      console.log("Received create-room:", data);
      socket.join(data.id);
    });

    // ルームに参加したら、同ルーム内の全クライアントに送信する
    socket.on("joinRoom", (data: Room) => {
      console.log("Received join-room:", data);
      socket.join(data.id);
      socket.to(data.id).emit("joinNewPlayer", data);
    });
    // メッセージを受信したら、同ルーム内の全クライアントに送信する
    socket.on("message", (data: Message) => {
      console.log("Received message:", data);
    });

    socket.on("startGame", (roomId: string) => {
      console.log("Received startGame:", roomId);
      io.to(roomId).emit("startGame", roomId);
    });

    socket.on("changePlayerState", (data: Player, room: Room) => {
      console.log("Received changePlayerState:", data, room);
      const updatedPlayers = room.players.map((player) => {
        if (player.id === data.id) {
          return data;
        }
        return player;
      });
      const updatedRoom: Room = { ...room, players: updatedPlayers };
      setRoom(updatedRoom);
      io.to(room.id).emit("updatePlayerState", updatedRoom);
    });

    // クライアントが切断した場合の処理
    socket.on("disconnect", () => {
      console.log("A client disconnected.");
    });
  });

  // CORS対策を一応、有効にした上でサーバーを設定する
  corsMiddleware(req, res, () => {
    res.socket.server.io = io;
    res.end();
  });
}
