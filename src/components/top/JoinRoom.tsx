"use client";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  useDisclosure,
} from "@yamada-ui/react";
import { useAtom } from "jotai";
import React, { FC, useState } from "react";
import { io } from "socket.io-client";
import { socketAtom } from "~/globalState/atoms";

type Props = {
  userName: string;
};

const JoinRoom: FC<Props> = ({ userName }) => {
  const [phrase, setPhrase] = useState("");
  const [, setSocket] = useAtom(socketAtom);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async () => {
    await fetch("/api/sockets", { method: "POST" });
    const socket = io({ autoConnect: false });
    socket.connect();
    socket.emit("joinRoom", { id: "room1", name: userName });
    setSocket(socket);
  };
  return (
    // TODO: 入室できるようにする
    <>
      <Button onClick={onOpen}>部屋に入る</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalHeader>ドラゴンボール</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            placeholder="あいことばを入力"
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            とじる
          </Button>
          <Button colorScheme="primary">Wikipadia</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default JoinRoom;
