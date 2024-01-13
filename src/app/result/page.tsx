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
import { Bar } from 'react-chartjs-2'; // グラフを表示するためのライブラリ
import { faker } from '@faker-js/faker' // ダミーデータを作るためのライブラリ

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

export default function Result() {
  // ダミーデータ
  const barColor = "rgba(252, 159, 50, 1)";

  const data = {
    labels: ["Player1", "Player2", "Player3"],
    datasets: [
      {
        label: "得点",
        data: [90, 30, 50],
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
  // グラフのオプション、目盛りを消したりする
  const options = {
    scales: {
      y: {
        min: 0,
        max: 100, // 得点の最大値を入れる
        ticks: {
          stepsize: 10, // 目盛りの間隔
          display: false, // 目盛りを消す
        },
      },
    },
    plugins: {
      legend: {
        display: false, // 凡例を非表示
      },
      tooltip: {
        enabled: false, // ツールチップを非表示
      },
      customRank: {
        position: 'center', // 順位表示をバーの中心に配置
      },
    }
  };


  return (
    <Box
      bgGradient="linear(to-t, #ffffff, #ff812e)"

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
        {/* ここ変更お願いします、ブラウザ終了をするわけじゃないから、Button */}
        <Link
          href=''
        >
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
          options={options}
        ></Bar>
      </Box>
      {/* END */}

      {/* もう一度遊ぶボタン */}
      {/* START */}
      <Box
        marginBottom={"5vh"}
      >
        {/* ここ変更お願いしますゲームの開始画面へのリンクになると思います */}
        <Link
          href=''
        >
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

