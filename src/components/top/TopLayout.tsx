"use client";

import { Heading, Input } from "@yamada-ui/react";
import React from "react";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import { playerAtom } from "~/globalState/atoms";
import { useAtom } from "jotai";

const TopLayout = () => {
  const [player, setPlayer] = useAtom(playerAtom);

  return (
    <>
      <Heading>アプリ名</Heading>
      <Input
        type="text"
        placeholder="ユーザー名を入力"
        value={player.name}
        onChange={(e) => setPlayer({ ...player, name: e.target.value })}
      />
      <CreateRoom playerName={player.name} />
      <JoinRoom playerName={player.name} />
    </>
  );
};

export default TopLayout;
