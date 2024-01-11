"use server"; // このファイル全体がサーバー側のJSとみなされる。

// Server Actions

import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

export async function createRoom(value: Omit<Room, "players">) {
  console.log("createRoom", value);
  await kv.incr(`phrase:${value.phrase}`);
  await kv.set(`room:${value.id}`, JSON.stringify(value));
  revalidatePath(`/gameplay`); // server mutation
}

export async function joinRoom(room: Room) {
  console.log("joinRoom", room);

  await kv.set(`room:${room.id}`, JSON.stringify(room));
  revalidatePath(`/gameplay`); // server mutation
}

export async function searchRoom(phrase: string) {
  console.log("searchRoom", phrase);
  const exists = await kv.exists(`phrase:${phrase}`);
  if (!exists) {
    return null;
  }

  const rooms = await kv.hgetall(`room`);
  return rooms;
}

export async function deleteRoom(room: Room) {
  console.log("deleteRoom", room);

  await kv.decr(`phrase:${room.phrase}`);
  await kv.hdel(`room:${room.id}`);
  revalidatePath(`/gameplay`); // server mutation
}
