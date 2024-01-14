"use client";

import { Box, Heading, Image, Input } from "@yamada-ui/react";
import React from "react";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import { playerAtom } from "~/globalState/atoms";
import { useAtom } from "jotai";

const NormalLayout = () => {
  const [player, setPlayer] = useAtom(playerAtom);

  return (
    <>
      <Box maxW="4xl" pb="xl">
        <Image
          src="/images/logo.png"
          alt="logo"
          w={"full"}
          />
      </Box>
      {/* <Heading>Ethic + Challenge</Heading> */}
      <Input
        maxW={"md"}
        type="text"
        placeholder="Enter your name"
        value={player.name}
        onChange={(e) => setPlayer({ ...player, name: e.target.value })}
      />
      <CreateRoom playerName={player.name} />
      <JoinRoom playerName={player.name} />
    </>
  );
};

export default NormalLayout;
