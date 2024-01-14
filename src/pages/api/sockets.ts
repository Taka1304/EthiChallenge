import type { NextApiRequest, NextApiResponse } from "next";
import cors from "cors";

import type { Socket as NetSocket } from "net";
import type { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import { setRoom } from "~/app/gameplay/_room";
import {
  makeModelAnswer,
  makeQuestion,
  makeScoring,
} from "~/app/gameplay/_openai";

// Next.jsの型定義を拡張してSocket.IOの型定義を追加
type ResponseWebSocket = NextApiResponse & {
  socket: NetSocket & { server: HttpServer & { io?: SocketServer } };
};

const corsMiddleware = cors();

// 採点のレスポンスをパースする
const parseScoreText = (scoreText: string) => {
  console.log(scoreText);
  const feedbacks: Feedbacks = {
    theoreticalJudgement: "",
    moralReasoning: "",
    empathy: "",
    socialResponsibility: "",
    selfKnowledge: "",
  };
  const scores: Scores = {
    theoreticalJudgement: 0,
    moralReasoning: 0,
    empathy: 0,
    socialResponsibility: 0,
    selfKnowledge: 0,
    total: 0,
  };

  const lines = scoreText.split("\n");
  let [category] = lines[0].split(": ");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    const [text, score] = line.split(": ");
    console.log(text, score);
    if (score) {
      category = text;
      const scoreValue = parseInt(score, 10);
      switch (category) {
        case "logical judgment ability":
          scores.theoreticalJudgement = scoreValue;
          break;
        case "moral reasoning":
          scores.moralReasoning = scoreValue;
          break;
        case "empathy":
          scores.empathy = scoreValue;
          break;
        case "social responsibility":
          scores.socialResponsibility = scoreValue;
          break;
        case "self-awareness":
          scores.selfKnowledge = scoreValue;
          break;
        case "Total Evaluation":
          scores.total = Math.max(
            parseInt(score.split("/")[0], 10),
            scoreValue,
          );
          break;
        default:
      }
    } else {
      switch (category) {
        case "logical judgment ability":
          feedbacks.theoreticalJudgement = line.replace("-", "").trim();
          break;
        case "moral reasoning":
          feedbacks.moralReasoning = line.replace("-", "").trim();
          break;
        case "empathy":
          feedbacks.empathy = line.replace("-", "").trim();
          break;
        case "social responsibility":
          feedbacks.socialResponsibility = line.replace("-", "").trim();
          break;
        case "self-awareness":
          feedbacks.selfKnowledge = line.replace("-", "").trim();
          break;
        default:
      }
    }
  }

  return { feedbacks, scores };
};

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

    socket.on("startGame", async (room: Room) => {
      console.log("Received startGame:", room);
      io.to(room.id).emit("startGame", room);

      const question = await makeQuestion(room.options.level);
      setRoom({ ...room, questions: [...room.questions, question] });
      io.to(room.id).emit("question", question);
    });
    // 実行するのはホスト以外
    socket.on("sendHost", async (data: Player, room: Room) => {
      const index = room.questions.length - 1;
      // 採点
      const scoreText = await makeScoring(
        room.questions[index],
        data.answers[index],
      );
      const { feedbacks, scores } = parseScoreText(scoreText);
      const hostId = room.players.find((player) => player.isHost)?.id as string;
      socket.to(hostId).emit("receiveHost", {
        ...data,
        feedbacks: [...data.feedbacks, feedbacks],
        scores: [...data.scores, scores],
        ready: data.isHost,
      });
    });
    // 実行するのはホスト
    socket.on("sendAnswer", async (data: Player, room: Room) => {
      console.log("Received answer:", data, room);
      const index = room.questions.length - 1;

      // 採点
      const scoreText = await makeScoring(
        room.questions[index],
        data.answers[index],
      );
      const { feedbacks, scores } = parseScoreText(scoreText);
      const updatedPlayers = room.players.map((player) => {
        if (player.id === data.id) {
          return {
            ...data,
            feedbacks: [...data.feedbacks, feedbacks],
            scores: [...data.scores, scores],
            ready: data.isHost,
          };
        }
        return player;
      });
      const updatedRoom: Room = {
        ...room,
        players: updatedPlayers,
        phase: "result",
      };
      setRoom(updatedRoom);
      io.to(room.id).emit("updatePlayerState", updatedRoom);

      // 模範解答の生成
      const modelAnswer = await makeModelAnswer(
        room.questions[room.questions.length - 1],
      );
      io.to(room.id).emit("modelAnswer", modelAnswer);
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
