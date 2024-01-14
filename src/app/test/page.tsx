"use client";


import { Box, Button } from '@yamada-ui/react';
import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// TODO: グラフの大きさをviewportに合わせる

const data = [
  {
    name: 'Player1',
    theoreticalJudgement: 12,
    moralReasoning: 13,
    empathy: 9,
    socialResponsibility: 4,
    selfKnowledge: 11,
  },
  {
    name: 'Player2',
    theoreticalJudgement: 12,
    moralReasoning: 13,
    empathy: 9,
    socialResponsibility: 4,
    selfKnowledge: 11,
  },
];


export default function Test() {
  return (
    <Box
      bgGradient="linear(to-t, #ffffff, #ff812e)"

      // 大きさをブラウザの最大値にする
      w={"100vw"}
      h={"100vh"}

      // 子要素を画面に下側から詰めて配置
      display="flex"
      justifyContent="center"
      alignItems="end"

    >
      {/* 終了するボタン */}
      {/* START */}
      <Box
        marginBottom={"5vh"}
      >
        <Button
          bg={"#ffaa8c"}
        >
          終了する
        </Button>
      </Box>
      {/* END */}

      {/* 棒グラフ */}
      {/* START */}
      <Box
        w={"80vw"}
        h={"80vh"}
      >

        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="theoreticalJudgement" stackId="a" fill="#001f4d" />
          <Bar dataKey="moralReasoning" stackId="a" fill="#ff4275" />
          <Bar dataKey="empathy" stackId="a" fill="#5ac8b8" />
          <Bar dataKey="socialResponsibility" stackId="a" fill="#80461b" />
          <Bar dataKey="selfKnowledge" stackId="a" fill="#b39eda" />
        </BarChart>
      </Box>
      {/* END */}

      {/* もう一度遊ぶボタン */}
      {/* START */}
      <Box
        marginBottom={"5vh"}
      >
        {/* もう一度遊ぶボタン */}
        <Button
          bg={"#ffaa8c"}
        >
          もう一度遊ぶ
        </Button>
      </Box>
      {/* END */}
    </Box>



  );
}