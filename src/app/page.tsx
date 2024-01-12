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
      <Box
        maxW="4xl"
      >
        {/* <Box
          gap="md"
          h="full"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        > */}
        <VStack w="full">
          <HStack>
            <Box
              bg="#f36804"
              borderRadius="50"
              paddingEnd="30"
              paddingStart="30"
            >
              <Heading>アプリ名</Heading>
            </Box>
          </HStack>
          <HStack
            justifyContent="flex-end"
            h="3rem"
          >
            <Link href="">ランキング</Link>
            <Link href="">アチーブメント</Link>
          </HStack>
        </VStack>
        <Container
          bg="orange"
          bgGradient="linear(to-b, #ff812e, #ffffff)"
          borderRadius="30"
        >
          <HStack>
            <VStack>
              <Spacer />
              <Spacer />
              <Heading>道徳心を試せ！！？</Heading>
              <Heading>新感覚型対戦ゲーム</Heading>
              <Spacer />
              <HStack>
                {/* リンク系はどうすればいいかわからないのでお願いします！ 一応Buttonにしておきました！ */}
                <Button
                  paddingEnd="2rem"
                  paddingStart="2rem"
                  borderRadius="20"
                  bg="#f36304"
                >対戦する</Button>
                <Spacer />
              </HStack>
            </VStack>
            {/* ここに画像が入るかも */}
          </HStack>
        </Container>
        <Heading>ルール</Heading>
        <Text>
          今回のアプリケーションは、小中学生を対象とした道徳教育を行うため、生成AIを使用した道徳クイズの対戦型ゲームです。

          プレイヤーはAIが作成したお題を元に、どういった行動を取るか文書で回答します。

          回答はAIによる採点にかけれられ、より道徳的な行動ができているプレイヤーに高い得点が与えられます。
          また、同時にAIによる模範解答が示され、道徳的により良い行動とは何かを知ることができます。

          これを繰り返し行い、最終的に最も道徳的なプレイヤーを決めます。
        </Text>
      </Box>
    </Box >
  );
}
