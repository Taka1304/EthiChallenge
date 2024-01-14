"use client";

import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  ZStack,
  Link as UILink,
  Container,
  Button,
  Spacer,
  Image,
  Grid,
  Divider,
} from "@yamada-ui/react";

import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <Box
      w="full"
      h="full"
      p="md"
      display="flex"
      justifyContent="center"
      marginBottom={"0px"}
      paddingBottom={"0px"}
      bg="#ffffff"
    >
      <Box maxW="4xl" marginBottom={"0px"} paddingBottom={"0px"}>
        {/* 一番上のアプリ名を書く水平コンテナ部分 */}
        {/* START */}
        <VStack w="full">
          <HStack>
            <Box
              bg="#ff5100"
              borderRadius="50"
              paddingEnd="30"
              paddingStart="30"
              boxShadow="0px 3px 10px rgba(0, 0, 0, 0.25)"
              maxW={"md"}
            >
              <Image src="/images/logo.png" alt="logo" w={"full"} />
            </Box>
          </HStack>
          <HStack justifyContent="flex-end" h="3rem">
            {/* ランキング＆アチーブメントは削除 */}
            {/* 
            <UILink href=""
              fontWeight={"bold"}
              textDecoration={"underline"}
              color={"black"}
            >ランキング</UILink>
            <UILink href=""
              fontWeight={"bold"}
              textDecoration={"underline"}
              color={"black"}
            >アチーブメント</UILink>
            */}
          </HStack>
        </VStack>
        {/* END */}

        {/* 最初のコンテナ部分 */}
        {/* START */}
        <Box
          bg="orange"
          bgGradient="linear(to-b, #ff812e, #ffffff)"
          borderRadius="30"
          padding={"0"}
        >
          <Grid
            templateAreas={`
            "one two"
            `}
          >
            <VStack gridArea={"one"}>
              <Box marginTop={"50px"} marginBottom={"30px"}>
                <Box
                  bg="white"
                  textAlign={"center"}
                  rounded={"10"}
                  padding={"2% 5% 2% 5%"}
                  margin={"7% 0% 5% 10%"}
                  w={"90%"}
                  boxShadow="0px 3px 10px rgba(0, 0, 0, 0.25)"
                >
                  <Heading fontSize={"1.7rem"}>道徳心を試せ！！</Heading>
                </Box>
                <Box
                  bg="white"
                  textAlign={"center"}
                  rounded={"10"}
                  padding={"2% 10% 2% 10%"}
                  margin={"5% 0% 5% 10%"}
                  w={"110%"}
                  boxShadow="0px 3px 10px rgba(0, 0, 0, 0.25)"
                >
                  <Heading fontSize={"2rem"}>新感覚型対戦ゲーム</Heading>
                </Box>
              </Box>
              <Link href="/gameplay">
                <Box textAlign={"center"}>
                  <Button
                    margin={"5% 0% 10% 5%"}
                    paddingStart="2rem"
                    paddingEnd="2rem"
                    paddingTop="1.5rem"
                    paddingBottom="1.5rem"
                    borderRadius="30"
                    bg="#f36304"
                    borderWidth="100px"
                    border={"0.5px solid black"}
                    boxShadow="0px 3px 10px rgba(0, 0, 0, 0.25)"
                    w={"40%"}
                  >
                    対戦する
                  </Button>
                </Box>
              </Link>
            </VStack>
            <Box gridArea={"two"}>
              <ZStack direction="top-left">
                {/* 画像 */}
                <Image
                  src="images/home-002.png"
                  alt="images/home-002.png"
                  w={"300px"}
                ></Image>
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
                <Image
                  src="images/home-001.png"
                  alt="images/home-001.png"
                  w={"300px"}
                ></Image>
              </ZStack>
            </Box>
          </Grid>
        </Box>
        {/* END */}

        {/* でっかくアプリ名が出てるところ、ハート画像が入っているコンテナ部分 */}
        {/* START */}
        <Container marginTop={"130px"}>
          <Grid
            gap="md"
            templateAreas={`
          "chapter empty image"
          "text text image"
          "text text image"`}
          >
            <Box gridArea="chapter">
              <Box
                bg="#ff5100"
                borderRadius="50"
                paddingEnd="30"
                paddingStart="30"
                boxShadow="0px 3px 10px rgba(0, 0, 0, 0.25)"
                maxW={"md"}
              >
                <Image src="/images/logo.png" alt="logo" w={"full"} />
              </Box>
              {/* 枠が横に伸びちゃうのを何とかしたい */}
            </Box>

            <Box gridArea="text">
              <Container fontWeight="bold" fontSize={"1.2rem"}>
                <Text>
                  善悪を判断して善を行おうとする心
                  <br />
                  「道徳心」
                </Text>
                <Text>
                  ゲーム感覚で道徳心を身に着けることができる
                  <br />
                  対戦型ウェブアプリ
                </Text>
              </Container>
            </Box>
            <Box
              gridArea="image"
              h={"250px"}
              w={"250px"}
              borderRadius={"50%"}
              bgGradient="linear(to-b, #ff5a00, #ffaa8c)"
              // bg={"#ff5900"}
              bg={"#ffaa8e"}
            >
              <Image
                gridArea="image"
                src="/images/home-003.png"
                alt="/images/home-003.png"
                h={"250px"}
                w={"250px"}
                borderRadius={"50%"}
              />
            </Box>
          </Grid>
        </Container>
        {/* END */}

        {/* 「-- アプリ名でできること -- 」と書かれている、ルール説明部分 */}
        {/* START */}
        <Box margin={"150px 0px 0px 0px"} paddingLeft={"0px"}>
          <Divider />
          <Heading textAlign="center" padding={"10px"}>
            EthiChallengeでできること
          </Heading>
          <Divider />

          <Container
            marginTop={"30px"}
            bgGradient="linear(to-b, #ffb07c, #fe8c66)"
            borderRadius={"45"}
            paddingLeft={"0px"}
            paddingRight={"0px"}
            marginLeft={"0px"}
            marginRight={"0px"}
            textAlign={"center"}
          >
            {/* キャッチコピーと画像 */}
            {/* START */}
            <Box>
              <Grid
                templateAreas={`
              "one two"
              `}
              >
                <Box
                  gridArea="one"
                  marginLeft={"0px"}
                  paddingLeft={"0px"}
                  color={"white"}
                >
                  <Box
                    bg={"black"}
                    borderRightRadius={"20"}
                    paddingTop={"15px"}
                    paddingBottom={"15px"}
                    marginTop={"40px"}
                    marginBottom={"30px"}
                    textAlign={"center"}
                    w={"110%"}
                    marginLeft={"0px"}
                  >
                    <Heading fontSize={"1.2rem"}>
                      クイズを通して道徳を学び、
                    </Heading>
                  </Box>
                  <Spacer />
                  <Box
                    bg={"black"}
                    borderRightRadius={"20"}
                    paddingTop={"15px"}
                    paddingBottom={"15px"}
                    paddingLeft={"10px"}
                    marginTop={"30px"}
                    marginBottom={"30px"}
                    textAlign={"center"}
                  >
                    <Heading fontSize={"1.2rem"}>
                      道徳的考え方を身に着けよう
                    </Heading>
                  </Box>
                </Box>
                <Box gridArea="two">
                  <Image
                    bg={"white"}
                    src="/images/home-004.png"
                    margin={"40px"}
                    marginRight={"10px"}
                    borderRadius={"20"}
                    h={"300px"}
                    w={"300px"}
                  />
                </Box>
              </Grid>
            </Box>
            {/* END */}

            {/* まる３つの部分 */}
            {/* START */}
            <Box margin={"0px"} padding={"0px"}>
              <Grid
                templateAreas={`
              "one two three"
              `}
                fontWeight={"bold"}
                marginRight={"7%"}
                marginLeft={"7%"}
              >
                <Box
                  gridArea="one"
                  w="200px"
                  h="200px"
                  borderRadius={"50%"}
                  backgroundColor={"white"}
                  // border={"0.5px solid black"}
                  boxShadow="0px 3px 10px rgba(0, 0, 0, 0.25)"
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  textAlign={"center"}
                >
                  <Text>
                    回答をAIが
                    <br />
                    自動で採点
                  </Text>
                </Box>

                <Box
                  gridArea="two"
                  w="200px"
                  h="200px"
                  borderRadius={"50%"}
                  backgroundColor={"white"}
                  // border={"0.5px solid black"}
                  boxShadow="0px 3px 10px rgba(0, 0, 0, 0.25)"
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  textAlign={"center"}
                >
                  <Text>
                    2人～4人
                    <br />
                    対戦
                  </Text>
                </Box>
                <Box
                  gridArea="three"
                  w="200px"
                  h="200px"
                  borderRadius={"50%"}
                  backgroundColor={"white"}
                  // border={"0.5px solid black"}
                  boxShadow="0px 3px 10px rgba(0, 0, 0, 0.25)"
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  textAlign={"center"}
                >
                  <Text>
                    模範解答
                    <br />
                    付き
                  </Text>
                </Box>
              </Grid>
            </Box>
            <Box textAlign={"center"}>
              <Link href="/gameplay">
                <Button
                  bg={"#f36304"}
                  borderRadius={"70"}
                  w={"30%"}
                  border={"0.5px solid black"}
                  boxShadow="0px 3px 10px rgba(0, 0, 0, 0.25)"
                >
                  対戦する
                </Button>
              </Link>
            </Box>
          </Container>
        </Box>
        {/* END */}

        {/* 最後の問いかけ部分 「みんなで一緒に、道徳心をみにつけませんか？」 */}
        {/* SATRT */}
        <Box marginTop={"150px"} padding={"20px"} justifyContent={"center"}>
          <Heading
            fontSize={"1.8rem"}
            textAlign={"center"}
            paddingLeft={"10px"}
            paddingRight={"10px"}
          >
            みんなで一緒に、道徳心を身につけませんか？
          </Heading>
          <Divider bg={"#ffaa8c"} h={"5px"} marginTop={"15px"} />
          <Container
            textAlign={"center"}
            fontWeight={"bold"}
            fontSize={"1.3rem"}
            marginTop={"20px"}
          >
            <Text>
              アプリ名、は小学生から中学生を対象に、
              <br />
              対戦型クイズ形式で道徳を教育する場を提供しています。
            </Text>
            <Text>
              このクイズを通して、学んだことが将来役に立つかもしれません。
            </Text>
            <Text>さぁ、みんなで現在の自分の道徳力を試してみよう。</Text>
          </Container>
        </Box>
        {/* END */}

        <Box
          marginTop={"200px"}
          marginBottom={"0px"}
          borderTopRadius={"30"}
          bgGradient="linear(to-b, #ff6500, #fdbd93)"
          h={"200px"}
        ></Box>
      </Box>
    </Box>
  );
}
