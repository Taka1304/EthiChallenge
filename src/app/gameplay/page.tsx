"use client";

import { Box, Center } from "@yamada-ui/react";
import { useAtom } from "jotai";
import React from "react";
import MatchingLayout from "~/components/matching/MatchingLayout";
import NormalLayout from "~/components/Normal/NormalLayout";
import GameLayout from "~/components/game/GameLayout";
import { roomAtom } from "~/globalState/atoms";
import ResultLayout from "~/components/result/ResultLayout";
import FinalResultLayout from "~/components/finalResult/FinalResultLayout";

export default function Game() {
  const [room] = useAtom(roomAtom);

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
          {room.phase === "normal" && <NormalLayout />}
          {room.phase === "matching" && <MatchingLayout />}
          {room.phase === "game" && <GameLayout />}
          {room.phase === "result" && <ResultLayout />}
          {room.phase === "finalResult" && <FinalResultLayout />}
        </Box>
      </Box>
    </Center>
  );
}
