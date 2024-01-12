"use client";

import { Box } from "@yamada-ui/react";
import React, { useState } from "react";

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
          TOP Page
        </Box>
      </Box>
    </Box>
  );
}
