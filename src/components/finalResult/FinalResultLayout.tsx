import {
  Tabs,
  Tab,
  TabPanel,
  Container,
  HStack,
  Spacer,
  Button,
  Image,
  Flex,
  Heading,
  Box,
  Center,
} from "@yamada-ui/react";
import { useAtom } from "jotai";
import React from "react";
import { roomAtom, socketAtom } from "~/globalState/atoms";
import RoomChart from "./RoomChart";
import Feedbacks from "./Feedbacks";
import PersonalRaderChart from "./PersonalRaderChart";

const FinalResultLayout = () => {
  const [roomState, setRoomState] = useAtom(roomAtom);
  const [socket] = useAtom(socketAtom);

  const Rank = roomState.players
    .map((player) => {
      return {
        id: player.id,
        name: player.name,
        score: player.scores[0].total,
      };
    })
    .sort((a, b) => b.score - a.score);

  const handleDisconnect = () => {
    socket.disconnect();
    setRoomState({ ...roomState, phase: "normal" });
  };

  const handleNextGame = () => {
    socket.emit("nextGame", roomState);
    setRoomState({ ...roomState, phase: "matching", questions: [] });
  };

  return (
    <Box>
      <Center>
        <Heading size="2xl">Final Result</Heading>
      </Center>
      <Tabs variant="sticky">
        <Tab>Room</Tab>
        <Tab>Personal</Tab>
        {/* <Tab>Feedbacks</Tab> */}

        <TabPanel>
          <Container h="lg" w="4xl">
            <RoomChart roomState={roomState} />
          </Container>
        </TabPanel>
        {/* <TabPanel>
        <Container h="lg" w="4xl">
          <Feedbacks roomState={roomState}/>
        </Container>
        </TabPanel> */}
        <TabPanel>
          <Container h="lg" w="4xl">
            <PersonalRaderChart roomState={roomState} />
          </Container>
        </TabPanel>
      </Tabs>
      <Flex justifyContent="center" w="full">
        <Flex justifyContent="space-around" w="2xl">
          {roomState.players.map((player) => (
            <Flex key={player.id} direction="column" alignItems="center">
              <Image src={player.avatar} alt="avatar" w="100px" h="100px" />
              <Heading size="md">{player.name}</Heading>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <HStack>
        <Button onClick={handleDisconnect}>Exit Room</Button>
        <Spacer />
        <Button onClick={handleNextGame}>Next Game</Button>
      </HStack>
    </Box>
  );
};

export default FinalResultLayout;
