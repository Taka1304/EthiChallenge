"use client";

import {
  Box,
  Heading,
  ScrollArea,
  Image,
  Flex,
  Center,
  Button,
  SlideFade,
} from "@yamada-ui/react";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { socketAtom, playerAtom, roomAtom } from "~/globalState/atoms";

const ResultLayout = () => {
  const [modelAnswer, setModelAnswer] = useState<string>("");
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);

  const [socket, setSocket] = useAtom(socketAtom);
  const [playerState, setPlayerState] = useAtom(playerAtom);
  const [roomState, setRoomState] = useAtom(roomAtom);

  const index = roomState.questions.length - 1;

  const totalScore = (scores: Scores) => {
    return (
      scores.empathy +
      scores.moralReasoning +
      scores.selfKnowledge +
      scores.socialResponsibility +
      scores.theoreticalJudgement
    );
  };
  useEffect(() => {
    socket.off("modelAnswer");
    socket.on("modelAnswer", (modelAnswer: string) => {
      console.log("modelAnswer", modelAnswer);
      setModelAnswer(modelAnswer);
      // setRoomState({
      //   ...roomState,
      //   modelAnswers: [...roomState.modelAnswers, modelAnswer],
      // });
    });
  }, []);

  useEffect(() => {
    console.log("set playerState, in result");
    setPlayerState(
      roomState.players.find(
        (player) => player.id === playerState.id,
      ) as Player,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomState.players]);

  const handleReady = () => {
    setPlayerState({ ...playerState, ready: true });
    socket.emit(
      "changePlayerState",
      { ...playerState, ready: true },
      roomState,
    );
  };

  return (
    <>
      <Flex
        h="full"
        minW="4xl"
        direction={"column"}
        py="md"
        alignItems={"center"}
        gap={"lg"}
      >
        <SlideFade
          h="full"
          isOpen={!showModelAnswer}
          duration={0.2}
          unmountOnExit
          delay={showModelAnswer ? 0 : 1}
        >
          <Box display="flex" flexDir="row" gap="2" p="md">
            <Heading textWrap="nowrap">{`Question${index + 1}`}</Heading>
            <ScrollArea
              maxH="60"
              p="2"
              w="full"
              bg="blackAlpha.300"
              borderRadius="md"
              innerProps={{ as: Box, gap: "md" }}
            >
              <Heading size="md">{roomState.questions[index]}</Heading>
            </ScrollArea>
          </Box>
          <Flex direction="column" p="md">
            <Flex roundedTop="md" border="solid 3px" borderColor="orange">
              <Box minW="4xs" minH="6xs" bg="orange">
                <Center h="full">
                  <Heading size="md">Player</Heading>
                </Center>
              </Box>
              <Box w="full" minH="6xs" bg="orange">
                <Center h="full">
                  <Heading size="md">Answer</Heading>
                </Center>
              </Box>
              <Box minW="4xs" minH="6xs" bg="warning">
                <Center h="full">
                  <Heading size="md">Score</Heading>
                </Center>
              </Box>
            </Flex>
            {roomState.players.map((player, i) => (
              <Flex
                key={player.id}
                border="solid 2px"
                borderColor="orange"
                roundedBottom={
                  i === roomState.players.length - 1 ? "md" : "none"
                }
              >
                <Flex
                  direction="column"
                  alignItems="center"
                  w="4xs"
                  minH="4xs"
                  flex="none"
                >
                  <Image
                    w="full"
                    src={player.avatar}
                    alt={`Player Avatar ${player.avatar}`}
                  />
                  <Heading size="md">{player.name}</Heading>
                </Flex>
                <Box w="full" minH="4xs">
                  <ScrollArea
                    maxH="60"
                    p="2"
                    bg="whiteAlpha.300"
                    borderRadius="md"
                    innerProps={{ as: Box, gap: "md" }}
                  >
                    <Heading size="md">{player.answers[index]}</Heading>
                  </ScrollArea>
                </Box>
                <Box minW="4xs" minH="4xs" bg="warning">
                  <Center h="full">
                    <Heading size="md">
                      {totalScore(player.scores[index])}
                    </Heading>
                  </Center>
                </Box>
              </Flex>
            ))}
          </Flex>
          <Flex direction="row-reverse" p="md">
            <Button
              colorScheme="orange"
              variant="solid"
              size="lg"
              onClick={() => setShowModelAnswer(true)}
            >
              {/* 模範解答を見る */}
              View Model Answers
            </Button>
          </Flex>
        </SlideFade>

        <SlideFade
          h="full"
          isOpen={showModelAnswer}
          unmountOnExit
          duration={0.2}
          delay={showModelAnswer ? 1 : 0}
        >
          <Flex direction="column" alignItems="center" h="full" gap="xl">
            <Heading size="lg">
              {/* 模範解答 */}
              Model Answer
            </Heading>
            <ScrollArea
              maxH="xl"
              maxW="5xl"
              p="md"
              bg="orange.200"
              borderRadius="md"
              innerProps={{ as: Box, gap: "md" }}
            >
              <Heading size="md">{modelAnswer}</Heading>
            </ScrollArea>
            <Flex w="full" justifyContent="space-between">
              {index + 1 === roomState.options.gameCount ? (
                <Button
                  colorScheme="orange"
                  variant="solid"
                  size="lg"
                  onClick={() =>
                    socket.emit("finalResult", {
                      ...roomState,
                      phase: "finalResult",
                    } as Room)
                  }
                >
                  {/* 最終結果を見る */}
                  View Final Result
                </Button>
              ) : playerState.isHost ? (
                <Button
                  colorScheme="orange"
                  variant="solid"
                  size="lg"
                  onClick={() =>
                    socket.emit("startGame", {
                      ...roomState,
                      phase: "game",
                    } as Room)
                  }
                  disabled={!roomState.players.every((player) => player.ready)}
                >
                  {!roomState.players.every((player) => player.ready)
                    // JP:全員の準備を待っています
                    ? "Waiting for everyone to be ready"
                    // 次の問題へ
                    : "Next"}
                </Button>
              ) : (
                <Button
                  colorScheme="orange"
                  variant="solid"
                  size="lg"
                  onClick={handleReady}
                  disabled={playerState.ready}
                >
                  {/* 次の問題を待つ */}
                  Wait for Next Question
                </Button>
              )}
            </Flex>
          </Flex>
        </SlideFade>
      </Flex>
    </>
  );
};

export default ResultLayout;
