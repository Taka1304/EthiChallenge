"use client";

import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
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
    <Box w="full" h="full" p="md" display="flex" justifyContent="center" marginBottom={"0px"} paddingBottom={"0px"}>
      <Box
        maxW="4xl"
        marginBottom={"0px"}
        paddingBottom={"0px"}
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
              boxShadow="0px 3px 10px rgba(0, 0, 0, 0.25)"
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
              <Link href="/gameplay">
                <Box
                  textAlign={"left"}
                >
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
                    w={"20%"}
                  >対戦する</Button>
                </Box>
              </Link>
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
                boxShadow="0px 3px 10px rgba(0, 0, 0, 0.25)"
              >アプリ名</Heading>
              {/* 枠が横に伸びちゃうのを何とかしたい */}
            </Box>

            <Box gridArea="text">
              <Container
                fontWeight="bold"
                fontSize={"1.2rem"}
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
            {/* START */}
            <Box>
              <Grid templateAreas={`
              "one two"
              `}>
                <Box
                  gridArea="one"
                  marginLeft={"0px"}
                  padding={"10px 20px "}
                  color={"white"}
                >
                  <Heading
                    bg={"black"}
                    fontSize={"1.2rem"}
                    borderRightRadius={"20"}
                    paddingTop={"15px"}
                    paddingBottom={"15px"}
                    paddingLeft={"10px"}
                    marginTop={"30px"}
                    marginBottom={"30px"}
                  >クイズを通して道徳を学び、</Heading>
                  <Spacer />
                  <Heading
                    bg={"black"}
                    fontSize={"1.2rem"}
                    paddingTop={"10px"}
                    paddingBottom={"10px"}
                    paddingLeft={"10px"}
                    borderRightRadius={"20"}
                  >道徳的考え方を身に着けよう</Heading>
                </Box>
                <Box
                  gridArea="two"
                >
                  <Image
                    bg={'white'}
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
            <Grid templateAreas={`
            "one two three"
            `}
              fontWeight={"bold"}
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
                  回答をAIが<br />
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
                  2人～4人<br />
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
                  模範解答<br />
                  付き
                </Text>
              </Box>
            </Grid>
            <Box
              textAlign={"center"}
            >
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
        <Box
          marginTop={"150px"}
          padding={"20px"}
          justifyContent={"center"}
        >
          <Heading
            fontSize={"1.8rem"}
            textAlign={"center"}
            paddingLeft={"10px"}
            paddingRight={"10px"}
          >
            みんなで一緒に、道徳心を身につけませんか？
          </Heading>
          <Divider
            bg={"#ffaa8c"}
            h={"5px"}
            marginTop={"15px"}
          />
          <Container
            textAlign={"center"}
            fontWeight={"bold"}
            fontSize={"1.3rem"}
            marginTop={"20px"}
          >
            <Text>
              アプリ名、は小学生から中学生を対象に、<br />
              対戦型クイズ形式で道徳を教育する場を提供しています。
            </Text>
            <Text>
              このクイズを通して、学んだことが将来役に立つかもしれません。
            </Text>
            <Text>
              さぁ、みんなで現在の自分の道徳力を試してみよう。
            </Text>
          </Container>
        </Box>
        {/* END */}

        <Box
          marginTop={"200px"}
          marginBottom={"0px"}
          borderTopRadius={"30"}
          bgGradient="linear(to-b, #ff6500, #fdbd93)"
          h={"200px"}
        >
        </Box>

      </Box >
    </Box >
  );
}
