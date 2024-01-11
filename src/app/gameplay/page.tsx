import { Box } from "@yamada-ui/react";
import React from "react";
import { io } from "socket.io-client";
import Layout from "~/components/top/Layout";

export default function Home() {
  return (
    <Box w="full" h="full" p="md" display="flex" justifyContent="center">
      <Box maxW="4xl">
        <Box
          gap="md"
          h="full"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Layout />
        </Box>
      </Box>
    </Box>
  );
}
