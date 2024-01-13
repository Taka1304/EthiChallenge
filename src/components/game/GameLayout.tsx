import { Box, Center, Heading, Motion, Textarea } from "@yamada-ui/react";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { socketAtom } from "~/globalState/atoms";

const GameLayout = () => {
  const [socket] = useAtom(socketAtom);
  const [questions, setQuestions] = React.useState<string[]>([]);

  useEffect(() => {
    socket.on("question", (question: string) => {
      console.log("question", question);
      setQuestions([...questions, question]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {questions ? (
        <>
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
          <Heading size="4xl">{`第${questions.length}問`}</Heading>
        </Motion>
        <Box h="100vh" display="flex" flexDir="column" gap="36" my="10vh" justifyContent="space-between" alignItems="center">
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
            <Box w="4xl" p="2" bg="blackAlpha.300" borderRadius="md">
              <Heading size="lg">{questions[0]}</Heading>
            </Box>
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
            <Heading size="lg">制限時間: {"30.00"}</Heading>
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
              <Textarea bgColor="orange.50" placeholder="こたえを入力" autoFocus focusBorderColor="orange.800"/>
            </Box>
          </Motion>
          </Box>
        </>
      ) : (
        <Center w="max" h="max" display="flex" flexDir="column" gap="20">
          <Heading>AIが問題を作成しています...</Heading>
          <Motion
            animate={{
              scale: [1, 1.5, 1.5, 1, 1],
              rotate: [0, 0, 180, 180, 0],
              borderRadius: ["0%", "0%", "50%", "50%", "0%"],
              backgroundColor: ["#FF008C", "#FF008C", "#FFBD00", "#FFBD00", "#FF008C"],
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
