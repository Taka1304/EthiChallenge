"use client";

import { Box, Center } from "@yamada-ui/react";
import { useAtom } from "jotai";
import React from "react";
import { io } from "socket.io-client";
import MatchingLayout from "~/components/matching/MatchingLayout";
import NormalLayout from "~/components/Normal/NormalLayout";
import GameLayout from "~/components/game/GameLayout";
import { gamePhaseAtom } from "~/globalState/atoms";

export default function Home() {
  const [gamePhase] = useAtom(gamePhaseAtom);
  console.log(gamePhase);
  return (
    <Center w="full" h="100vh" p="md" overflowY="hidden" gap="4">
      <Box maxW="6xl">
        <Box
          gap="md"
          h="100vh"
          w="full"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent={"center"}
          position={"relative"}
        >
          {gamePhase === "normal" && <NormalLayout />}
          {gamePhase === "matching" && <MatchingLayout />}
          {gamePhase === "game" && <GameLayout />}
        </Box>
      </Box>
    </Center>
  );
}
