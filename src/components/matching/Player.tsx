import { Box, Button, Center, GridItem, Heading, Image, Loading } from "@yamada-ui/react";
import React, { FC, useState } from "react";
import { Icon as FontAwesomeIcon } from "@yamada-ui/fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useAtom } from "jotai";
import { playerAtom } from "~/globalState/atoms";

type Props = {
  player: Player;
};

const Player: FC<Props> = ({ player }) => {
  const [ready, setReady] = useState(false);
  const [image, setImage] = useState("/images/007.png");

  const [playerState, setPlayerState] = useAtom(playerAtom);

  const handleReady = () => {
    setReady(true);
    setPlayerState({ ...playerState, ready: true });
  };
  const handleImage = () => {
    const random = Math.floor(Math.random() * 23);
    setImage(`/images/${random.toString().padStart(3, "0")}.png`);
  };
  if (player.id === "") {
    // 未参加のプレイヤー
    return (
      <GridItem w="full" h="4xs" rounded="md" border="dashed" minH="xs" >
        <Center h="full" flexDirection="column">
          <Heading as="h2" size="sm">
            プレイヤーの参加を<br />待っています...
          </Heading>
          <Loading variant="dots" size="6xl" color="green.500" />
        </Center>
      </GridItem>
    );
  }
  return (
    <GridItem w="full" h="4xs" rounded="md" minH="xs">
      <Heading>{player.name}</Heading>
      <Box position="relative" maxW="100%">
        <Image w="100%" src={image} alt={`Player Avatar ${image}`} />
        {playerState.id === player.id && (
          <Button
            position={"absolute"}
            bottom={0}
            right={0}
            size={"lg"}
            onClick={handleImage}
            leftIcon={<FontAwesomeIcon icon={faRotateRight} />}
          />
        )}
      </Box>
      {playerState.id === player.id ? (
        <>
          <Button onClick={handleReady}>準備完了</Button>
        </>
      ) : (
        <Box h="full">
          {ready ? (
            <Heading size="xs">準備完了</Heading>
          ) : (
            <Heading size="xs">準備中...</Heading>
          )}
        </Box>
      )}
    </GridItem>
  );
};

export default Player;