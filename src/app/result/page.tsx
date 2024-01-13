"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { faker } from '@faker-js/faker'

import {
  Box,
  Link,
  Button,
  Heading,
} from '@yamada-ui/react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

export default function Home() {
  const data = {
    labels: ["Player1", "Player2", "Player3"],
    datasets: [
      {
        label: "ランキング",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(252, 159, 50, 1)",
          "rgba(252, 159, 50, 1)",
          "rgba(252, 159, 50, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 5,
      },
    ],
  };

  return (
    <Box
      bgGradient="linear(to-t, #ffd2b5, #ff812e)"

      // 大きさを部ライザの最大値にする
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
        <Link>
          <Button
            bg={"#ffaa8c"}
          >
            終了する
          </Button>
        </Link>
      </Box>
      {/* END */}

      {/* 棒グラフ */}
      {/* START */}
      <Box
        w={"80vw"}
        h={"80vh"}
      >
        <Bar
          data={data}
        ></Bar>
      </Box>
      {/* END */}

      {/* もう一度遊ぶボタン */}
      {/* START */}
      <Box
        marginBottom={"5vh"}
      >
        <Link>
          <Button
            bg={"#ffaa8c"}
          >
            もう一度遊ぶ
          </Button>
        </Link>
      </Box>
      {/* END */}
    </Box>
  )
}

