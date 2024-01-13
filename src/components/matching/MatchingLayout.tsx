import { Box, Button, Grid, HStack, Heading, Spacer } from "@yamada-ui/react";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import {
  gamePhaseAtom,
  playerAtom,
  roomAtom,
  socketAtom,
} from "~/globalState/atoms";
import PlayerAvatar from "./Player";
import { io } from "socket.io-client";

const MatchingLayout = () => {
  const [socket, setSocket] = useAtom(socketAtom);
  const [roomState, setRoomState] = useAtom(roomAtom);
  const [playerState,] = useAtom(playerAtom);
  const [, setGamePhase] = useAtom(gamePhaseAtom);

  const initSocket = async () => {
    console.log(socket);

    socket.on("updatePlayerState", (data: Room) => {
      console.log("updatePlayerState", data);
      setRoomState(data)
    });
    socket.on("joinNewPlayer", (data: Room) => {
      console.log("joinNewPlayer", data);
      setRoomState(data);
    });
    socket.on("startGame", (room: Room) => {
      console.log("startGame", room);
      setGamePhase("game");
    });
    socket.on("disconnect", () => {
      // TODO: 切断時のRedis、RoomState更新処理
      console.log("disconnect");
      setGamePhase("normal");
    });
  };

  useEffect(() => {
    initSocket();
  }, []);

  console.log("roomState", roomState);
  console.log("playerState", playerState);

  const handleDisconnect = () => {
    socket.disconnect();
    setSocket(io({ autoConnect: false }));
    setGamePhase("normal");
  };

  return (
    <Box textAlign="center" display="flex" flexDirection="column" gap="xl">
      <Heading>このルームのあいことば: {roomState.phrase}</Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap="md">
        {roomState.players.map((player) => (
          <PlayerAvatar key={player.id} player={player} />
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
              />
            ))}
          </>
        )}
      </Grid>
      <HStack>
        <Button onClick={handleDisconnect}>部屋から抜ける</Button>
        <Spacer />
        {playerState.isHost && (
          <Button 
            onClick={() => socket.emit("startGame", roomState)}
            colorScheme="orange"
            disabled={!roomState.players.every((player) => player.ready)}
            >
            ゲームを開始する
          </Button>
        )}
      </HStack>
    </Box>
  );
};

export default MatchingLayout;
