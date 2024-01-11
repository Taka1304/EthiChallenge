import { Box, HStack, Heading } from "@yamada-ui/react";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { playerAtom, roomAtom, socketAtom } from "~/globalState/atoms";
import PlayerAvatar from "./Player";
import { io } from "socket.io-client";

const MatchingLayout = () => {
  const [socket, setSocket] = useAtom(socketAtom);
  const [roomState, setRoomState] = useAtom(roomAtom);
  const [playerState, setPlayerState] = useAtom(playerAtom);

  console.log(roomState);
  const updatePlayer = async () => {
    await fetch("/api/sockets", { method: "POST" });
    socket.emit("changePlayerState", playerState, roomState.id);
    socket.on("connect", () => {
      console.log(socket.id);
      setPlayerState({ ...playerState, id: socket.id || "" });
    });
    socket.on("changePlayerState", (data: Player) => {
      console.log("changePlayerState", data);
      setRoomState((prevRoomState) => {
        const updatedPlayers = prevRoomState.players.map((player) => {
          if (player.id === data.id) {
            return data;
          }
          return player;
        });
        return { ...prevRoomState, players: updatedPlayers };
      });
    });
  };

  useEffect(() => {
    updatePlayer();
    return () => {
      socket.disconnect();
    };
  }, [playerState]);
  return (
    <Box>
      <Heading>このルームのあいことば: {roomState.phrase}</Heading>
      <HStack>
        {roomState.players.map((player) => (
          <PlayerAvatar key={player.id} player={player}></PlayerAvatar>
        ))}
        {roomState.players.length < 4 && (
          <>
            {[...Array(4 - roomState.players.length)].map((_, index) => (
              <PlayerAvatar
                key={`placeholder-${index}`}
                player={{
                  id: "",
                  avatar: "",
                  name: "",
                  scores: [],
                  answers: [],
                  ready: false,
                  isHost: false,
                }}
              ></PlayerAvatar>
            ))}
          </>
        )}
      </HStack>
    </Box>
  );
};

export default MatchingLayout;
