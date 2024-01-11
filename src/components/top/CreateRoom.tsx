"use client";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  Button,
  useDisclosure,
  useSteps,
  Steps,
  HStack,
  Stepper,
  VStack,
} from "@yamada-ui/react";
import React, { FC, useState } from "react";
import { io } from "socket.io-client";
import { createRoom } from "~/app/gameplay/_room";

type Props = {
  userName: string;
};

const CreateRoom: FC<Props> = ({ userName }) => {
  const [phrase, setPhrase] = useState("");
  const [option, setOption] = useState<Option>({
    level: "かんたん",
    gameCount: 3,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async () => {
    await fetch("/api/sockets", { method: "POST" });
    const roomId = crypto.randomUUID();
    const socket = io({ autoConnect: false });
    socket.connect();
    socket.emit("createRoom", { id: roomId, name: userName });
    createRoom({
      id: roomId,
      hostName: userName,
      level: option.level,
      gameCount: option.gameCount,
      phrase,
    });
  };

  const steps: Steps = [
    { title: "難易度", description: "" },
    { title: "ゲーム数", description: "" },
    { title: "あいことば", description: "" },
  ];
  const LEVEL = ["かんたん", "ふつう", "むずかしい"];
  const GAME_COUNT = [1, 2, 3, 4, 5];

  const { activeStep, onStepNext, onStepPrev } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <>
      <Button onClick={onOpen}>部屋を作る</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalHeader>部屋を作る</ModalHeader>
        <ModalBody>
          <VStack minH="md">
            <Stepper index={activeStep} steps={steps} />
            {activeStep === 0 && (
              <HStack
                px="8"
                w="full"
                display="flex"
                justifyContent="space-between"
              >
                {LEVEL.map((level, index) => (
                  <Button
                    colorScheme="orange"
                    variant={level === option.level ? "solid" : "outline"}
                    key={index}
                    onClick={() => {
                      setOption({ ...option, level: level as GameLevel });
                      onStepNext();
                    }}
                  >
                    {level}
                  </Button>
                ))}
              </HStack>
            )}
            {activeStep === 1 && (
              <HStack
                px="8"
                w="full"
                display="flex"
                justifyContent="space-between"
              >
                {GAME_COUNT.map((count, index) => (
                  <Button
                    colorScheme="orange"
                    variant={count === option.gameCount ? "solid" : "outline"}
                    key={index}
                    onClick={() => {
                      setOption({ ...option, gameCount: count });
                      onStepNext();
                    }}
                  >
                    {count}
                  </Button>
                ))}
              </HStack>
            )}
            {activeStep === 2 && (
              <Input
                type="text"
                required
                placeholder="あいことばを入力"
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
              />
            )}
            {activeStep === 3 && (
              <VStack>
                <p>難易度：{option.level}</p>
                <p>ゲーム数：{option.gameCount}</p>
                <p>あいことば：{phrase}</p>
              </VStack>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            onClick={() => {
              if (activeStep === 0) {
                onClose();
              } else {
                onStepPrev();
              }
            }}
          >
            もどる
          </Button>
          <Button
            disabled={activeStep === 2 && phrase === ""}
            colorScheme="primary"
            onClick={() => {
              if (activeStep === 3) {
                handleSubmit();
              } else {
                onStepNext();
              }
            }}
          >
            {activeStep === 3 ? "つくる" : "次へ"}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CreateRoom;
