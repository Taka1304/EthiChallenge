"use server"; // このファイル全体がサーバー側のJSとみなされる。

// Server Actions

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

export async function existsPhrase(phrase: string) {
  const phrases = await kv.scan(0, { match: `${phrase}:*` });
  console.log("existsPhrase._room.ts", phrases);
  return phrases[1].length;
}

export async function getRoomId(phrase: string) {
  const roomId = await kv.scan(0, { match: `${phrase}:*` });
  console.log("getRoomId._room.ts", roomId);
  if (roomId[1].length === 0) {
    return "";
  }
  return roomId[1][0].split(":")[1];
}

export async function createRoom(value: Room) {
  console.log("createRoom._room.ts", value);
  // phrase:roomId, RoomData
  await kv.set(`${value.phrase}:${value.id}`, value);
  revalidatePath(`/gameplay`); // server mutation
}

export async function setRoom(phrase: string, roomId: string, room: Room) {
  console.log("setRoom._room.ts", room);
  await kv.set(`${phrase}:${roomId}`, { room });
  revalidatePath(`/gameplay`); // server mutation
}

export async function joinRoom(player: Player, phrase: string) {
  const roomId = await getRoomId(phrase);
  if (roomId === "") {
    return "NotFound";
  }

  const room = await kv.get<Room>(`${phrase}:${roomId}`).then(async (room) => {
    if (room) {
      if (room.players.length >= 4) {
        return "Full";
      }
      room.players.push(player);
      console.log("joinRoom._room.ts", room);
      await kv.set(`${phrase}:${roomId}`, room);
      return room;
    }
  });
  revalidatePath(`/gameplay`);
  return room;
}

export async function deleteRoom(room: Room) {
  console.log("deleteRoom._room.ts", room);

  await kv.hdel(`${room.phrase}:${room.id}`);
  revalidatePath(`/gameplay`); // server mutation
}
