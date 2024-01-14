import {
  Box,
  Center,
  Heading,
  Motion,
  ScaleFade,
  ScrollArea,
  Textarea,
  Text,
} from "@yamada-ui/react";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { playerAtom, roomAtom, socketAtom } from "~/globalState/atoms";
import Timer from "./Timer";

const GameLayout = () => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [end, setEnd] = useState(false);
  const [receiveAnswer, setReceiveAnswer] = useState(0);

  const [socket] = useAtom(socketAtom);
  const [player, setPlayer] = useAtom(playerAtom);
  const [roomState, setRoomState] = useAtom(roomAtom);

  useEffect(() => {
    socket.off("question");
    socket.on("question", (question: string) => {
      console.log("question", question);
      setQuestion(question);
      setRoomState({
        ...roomState,
        questions: [...roomState.questions, question],
      });
    });
    {
      player.isHost && socket.off("receiveHost");
      socket.on("receiveHost", (player: Player) => {
        console.log("receiveHost", player);
        setReceiveAnswer(receiveAnswer + 1);
        setRoomState((prevRoomState) => ({
          ...prevRoomState,
          players: roomState.players.map((p) =>
            p.id === player.id ? player : p,
          ),
        }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (end) {
      if (player.isHost) {
        if (receiveAnswer === roomState.players.length - 1) {
          setPlayer({ ...player, answers: [...player.answers, answer] });
          socket.emit(
            "sendAnswer",
            { ...player, answers: [...player.answers, answer] },
            roomState,
          );
        }
      } else {
        setPlayer({ ...player, answers: [...player.answers, answer] });
        socket.emit(
          "sendHost",
          { ...player, answers: [...player.answers, answer] },
          roomState,
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, receiveAnswer]);
  return (
    <>
      {question ? (
        <>
          <ScaleFade isOpen={end} position={"absolute"}>
            <Text
              w="full"
              fontSize="8rem"
              fontWeight="bold"
              bgGradient="linear(to-l, #f97415, #ec4699)"
              bgClip="text"
              textAlign={"center"}
            >
              Time&apos;s up!
            </Text>
          </ScaleFade>
          <Motion
            animate={{
              scale: [1, 0.75],
              top: "0%",
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 1],
            }}
            position={"absolute"}
          >
            <Heading size="4xl">{`Question${roomState.questions.length}`}</Heading>
          </Motion>
          <Box
            h="100vh"
            display="flex"
            flexDir="column"
            mt="10vh"
            py="md"
            justifyContent="space-between"
            alignItems="center"
          >
            <Motion
              animate={{
                opacity: [0, 1],
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                times: [0, 1],
                delay: 2,
              }}
              opacity={0}
            >
              <ScrollArea
                maxH="80"
                w="4xl"
                p="2"
                bg="blackAlpha.300"
                borderRadius="md"
                innerProps={{ as: Box, gap: "md" }}
              >
                <Heading size="lg">
                  {roomState.questions[roomState.questions.length - 1]}
                </Heading>
              </ScrollArea>
            </Motion>
            <Motion
              animate={{
                opacity: [0, 1],
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                times: [0, 1],
                delay: 3,
              }}
              opacity={0}
            >
              <Heading size="lg">
                {!end && <Timer duration={60} onTimerFinish={setEnd} />}
              </Heading>
            </Motion>
            <Motion
              animate={{
                opacity: [0, 1],
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                times: [0, 1],
                delay: 3,
              }}
              opacity={0}
            >
              <Box w="4xl" p="4" bg="orange.300" borderRadius="md">
                <Textarea
                  disabled={end}
                  bgColor="orange.50"
                  placeholder="Enter your answer"
                  autoFocus
                  focusBorderColor="orange.800"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </Box>
            </Motion>
          </Box>
        </>
      ) : (
        <Center w="max" h="max" display="flex" flexDir="column" gap="20">
          <Heading>AI is generating questions...</Heading>
          <Motion
            animate={{
              scale: [1, 1.5, 1.5, 1, 1],
              rotate: [0, 0, 180, 180, 0],
              borderRadius: ["0%", "0%", "50%", "50%", "0%"],
              backgroundColor: [
                "#ec4699",
                "#ec4699",
                "#f97415",
                "#f97415",
                "#ec4699",
              ],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
            w="3xs"
            h="3xs"
          />
        </Center>
      )}
    </>
  );
};

export default GameLayout;
