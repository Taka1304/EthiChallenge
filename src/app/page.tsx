"use client";

import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Link,
  Container,
  Button,
  Spacer,
  Image,
} from "@yamada-ui/react";

import React, { useState } from "react";

export default function Home() {
  return (
    <Box w="full" h="full" p="md" display="flex" justifyContent="center">
      <Box maxW="4xl">
        <VStack w="full">
          <HStack>
            <Heading>アプリ名</Heading>
          </HStack>
          <HStack justifyContent="flex-end">
            <Link
              href=""
            >
              ランキング
            </Link>
            <Link
              href=""
            >
              アチーブメント
            </Link>
          </HStack>
        </VStack>
        <Container>
          <HStack>
            <VStack>
              <Spacer />
              <Heading>道徳心を試せ！！</Heading>
              <Heading>新感覚型対戦ゲーム</Heading>
              <HStack>
                {/* リンク系はどうすればいいかわからないのでお願いします！ 一応Buttonにしておきました！ */}
                <Button>対戦する</Button>
              </HStack>
            </VStack>
            {/* ここに画像が入るかも */}
          </HStack>
        </Container>
      </Box>
    </Box >
  );
}
