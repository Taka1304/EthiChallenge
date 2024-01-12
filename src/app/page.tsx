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
  Grid,
  GridItem,
  Divider,
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

        {/* 一番上のアプリ名を書く水平コンテナ部分 */}
        {/* START */}
        <VStack w="full">
          <HStack>
            <Box
              bg="#f36804"
              borderRadius="50"
              paddingEnd="30"
              paddingStart="30"
            >
              <Heading
                as="h3"
                fontSize="2rem"
              >アプリ名</Heading>
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
        {/* END */}

        {/* 最初のコンテナ部分 */}
        {/* START */}
        <Box
          bg="orange"
          bgGradient="linear(to-b, #ff812e, #ffffff)"
          borderRadius="30"
          padding={10}
        >
          <HStack>
            <VStack>
              <Box marginTop={"50px"} marginBottom={"30px"}>
                <Heading>道徳心を試せ！！？</Heading>
                <Heading>新感覚型対戦ゲーム</Heading>
              </Box>
              {/* リンク系はどうすればいいかわからないのでお願いします！ 一応Buttonにしておきました！ */}
              <Box>
                <Button
                  paddingStart="2rem"
                  paddingEnd="2rem"
                  paddingTop="1.5rem"
                  paddingBottom="1.5rem"
                  borderRadius="30"
                  bg="#f36304"
                  borderWidth="100px"
                  border={"0.5px solid black"}
                  boxShadow="0px 3px 10px rgba(0, 0, 0, 0.25)"
                >対戦する</Button>
              </Box>
            </VStack>
            {/* ここに画像が入るかも */}
          </HStack>
        </Box>
        {/* END */}

        {/* でっかくアプリ名が出てるところ、ハート画像が入っているコンテナ部分 */}
        {/* START */}
        <Container
          marginTop={"130px"}
        >
          <Grid
            gap="md"
            templateAreas={`
          "chapter empty image"
          "text text image"
          "text text image"`}>
            <Box gridArea="chapter">
              <Heading
                bg="#f36804"
                paddingStart="2rem"
                paddingEnd="2rem"
                borderRadius="4rem"
                fontSize="2rem"
                paddingTop="1rem"
                paddingBottom="1rem"
              >アプリ名</Heading>
              {/* 枠が横に伸びちゃうのを何とかしたい */}
            </Box>

            <Box gridArea="text">
              <Container
                fontWeight="bold"
              >
                <Text>
                  善悪を判断して善を行おうとする心<br />
                  「道徳心」
                </Text>
                <Text>
                  ゲーム感覚で道徳心を身に着けることができる<br />
                  対戦型ウェブアプリ
                </Text>
              </Container>
            </Box>
            <GridItem
              area="image" w="full" minH="4xs" rounded="md" bg="primary"
            >ハートマークの画像が入る(ぎゅーっとなってるのは画像入れたら改善される、、はず)</GridItem>

          </Grid>
        </Container>
        {/* END */}

        {/* 「-- アプリ名でできること -- 」と書かれている、ルール説明部分 */}
        {/* START */}
        <Box
          marginTop={"150px"}
        >

          <Divider />
          <Heading
            textAlign="center"
            padding={"10px"}
          >アプリ名でできること</Heading>
          <Divider />


          <Container
            marginTop={"30px"}
            bgGradient="linear(to-b, #ffb07c, #fe8c66)"
            borderRadius={"45"}
          >
            {/* キャッチコピーと画像 */}
            <Grid templateAreas={`
            "one two"
            `}>
              <Box
                gridArea="one"
                bg="blue"
                marginLeft={"0px"}
                paddingLeft={"0px"}
              >
                <Text>クイズを通して道徳を学び、</Text>
                <Text>道徳的考え方を身に着けよう</Text>

              </Box>
              <Box gridArea="two">
                <GridItem w="full" />
              </Box>

            </Grid>

            {/* まる３つの部分 */}
            <Grid templateAreas={`
            "one two three"
            `}>
              <Box
                gridArea="one"
                w="200px"
                h="200px"
                borderRadius={"50%"}
                backgroundColor={"white"}
                // border={"0.5px solid black"}
                boxShadow="0px 3px 10px rgba(0, 0, 0, 0.25)"
              >

              </Box>

              <Box
                gridArea="two"
                w="200px"
                h="200px"
                borderRadius={"50%"}
                backgroundColor={"white"}
                // border={"0.5px solid black"}
                boxShadow="0px 3px 10px rgba(0, 0, 0, 0.25)"
              >

              </Box>
              <Box
                gridArea="three"
                w="200px"
                h="200px"
                borderRadius={"50%"}
                backgroundColor={"white"}
                // border={"0.5px solid black"}
                boxShadow="0px 3px 10px rgba(0, 0, 0, 0.25)"
              >

              </Box>
            </Grid>
          </Container>
        </Box>
        {/* END */}

        {/* 最後の問いかけ部分 「みんなで一緒に、道徳心をみにつけませんか？」 */}
        {/* SATRT */}
        <Box
          marginTop={"150px"}
          padding={"20px"}
          justifyContent={"center"}
        >
          <Heading
            fontSize={"2rem"}
            textAlign={"center"}
          >
            みんなで一緒に、道徳心を身につけませんか？
          </Heading>
        </Box>
        {/* END */}


        <Container>

          <Heading>ルール</Heading>
          <Text>
            今回のアプリケーションは、小中学生を対象とした道徳教育を行うため、生成AIを使用した道徳クイズの対戦型ゲームです。

            プレイヤーはAIが作成したお題を元に、どういった行動を取るか文書で回答します。

            回答はAIによる採点にかけれられ、より道徳的な行動ができているプレイヤーに高い得点が与えられます。
            また、同時にAIによる模範解答が示され、道徳的により良い行動とは何かを知ることができます。

            これを繰り返し行い、最終的に最も道徳的なプレイヤーを決めます。
          </Text>
        </Container>
      </Box >
    </Box >
  );
}
