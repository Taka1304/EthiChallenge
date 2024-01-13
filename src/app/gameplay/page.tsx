"use client";

import { Box } from "@yamada-ui/react";
import { useAtom } from "jotai";
import React from "react";
import { io } from "socket.io-client";
import MatchingLayout from "~/components/matching/MatchingLayout";
import TopLayout from "~/components/top/TopLayout";
import WaitingLayout from "~/components/waiting/WaitingLayout";
import { gamePhaseAtom } from "~/globalState/atoms";

export default function Home() {
  const [gamePhase] = useAtom(gamePhaseAtom);
  console.log(gamePhase);
  return (
    <Box w="full" h="full" p="md" display="flex" justifyContent="center">
      <Box maxW="6xl">
        <Box
          gap="md"
          h="full"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {gamePhase === "normal" && <TopLayout />}
          {gamePhase === "matching" && <MatchingLayout />}
          {gamePhase === "waiting" && <WaitingLayout />}
        </Box>
      </Box>
    </Box>
  );
}
