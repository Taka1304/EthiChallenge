"use client";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  useDisclosure,
  Heading,
} from "@yamada-ui/react";
import { useAtom } from "jotai";
import React, { FC, useState } from "react";
import { io } from "socket.io-client";
import { joinRoom } from "~/app/gameplay/_room";
import {
  gamePhaseAtom,
  playerAtom,
  roomAtom,
  socketAtom,
} from "~/globalState/atoms";

type Props = {
  playerName: string;
};

const JoinRoom: FC<Props> = ({ playerName }) => {
  const [phrase, setPhrase] = useState("");
  const [error, setError] = useState("");

  const [, setSocket] = useAtom(socketAtom);
  const [, setGamePhase] = useAtom(gamePhaseAtom);
  const [, setRoomState] = useAtom(roomAtom);
  const [, setPlayerState] = useAtom(playerAtom);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async () => {
    const socket = io({ autoConnect: false });
    socket.connect();
    socket.on("connect", async () => {
      console.log(socket.id);
      const player = {
        id: socket.id || "",
        avatar: "/images/000.png",
        name: playerName || "Player",
        scores: [],
        answers: [],
        ready: false,
        isHost: false,
      };

      const room = await joinRoom(player, phrase);
      if (room === "NotFound") {
        setError("ルームが見つかりませんでした");
        return;
      } else if (room === "Full") {
        setError("ルームがいっぱいです");
        return;
      } else if (room) {
        setError("");
        socket.emit("joinRoom", room);
        setSocket(socket);
        setRoomState(room);
        setGamePhase("matching");
        setPlayerState(player);
      }
    });
  };
  return (
    <>
      <Button onClick={onOpen}>部屋に入る</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalHeader>部屋に入る</ModalHeader>
        <ModalBody>
          <Heading as="p" size="sm">
            同じあいことばを入力した人と遊べます！
          </Heading>
          <Input
            type="text"
            placeholder="あいことばを入力"
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
          />
          <Heading as="p" size="sm" color="red.500">
            {error}
          </Heading>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            とじる
          </Button>
          <Button colorScheme="primary" onClick={handleSubmit}>
            さがす
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default JoinRoom;
