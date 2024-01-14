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
  const barColor = "rgba(252, 159, 50, 1)";

  // ダミーデータ
  const data = {
    // プレイヤーの名前
    labels: ["Player1", "Player2", "Player3"],
    datasets: [
      {
        label: "thoreticalJudgement",
        // このラベルにおける各プレイヤー得点
        data: [10, 10, 10],
        // バーの色
        backgroundColor: [
          "#001f4d",
        ],
      },
      // 以下同じ
      {
        label: "moralReasoning",
        data: [10, 10, 10],
        backgroundColor: [
          "#ff4275",
        ],
      },
      {
        label: "empathy",
        data: [10, 10, 10],
        backgroundColor: [
          "#5ac8b8",
        ],
      },
      {
        label: "socialResponsibility",
        data: [20, 10, 10],
        backgroundColor: [
          "#80461b",
        ],
      },
      {
        label: "selfknowledge",
        data: [10, 10, 10],
        backgroundColor: [
          "#b39eda",
        ],
      },
    ],
  };
  // グラフのオプション、目盛りを消したりする
  const options = {
    scales: {
      y: {
        stacked: true,
        min: 0,
        max: 100, // 得点の最大値を入れる
        ticks: {
          stepsize: 10, // 目盛りの間隔
          display: true, // 目盛りを表示(明示的に書いた)
        },

      },
      x: {
        stacked: true,
      }
    },
    plugins: {
      legend: {
        display: true, // 凡例を非表示
        // 凡例の位置を下にする
        position: 'bottom',
      },
      tooltip: {
        enabled: true, // ツールチップを表示(カーソルを合わせたときに出るやつ)明示的に書いた
        // 単位を表示する(ツールチップの単位に'points'文字列を追加)
        callbacks: {
          label: function (context: any) {
            return context.dataset.label + ": " + context.parsed.y + "points";
          }
        }
      },

    }
  };


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
        {/* 終了ボタン */}
        < Button
          bg={"#ffaa8c"}

          boxShadow="0px 3px 10px rgba(0, 0, 0, 0.25)"
        >
          終了する
        </Button >
      </Box >
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
        {/* もう一度遊ぶボタン */}
        <Button
          bg={"#ffaa8c"}
          boxShadow="0px 3px 10px rgba(0, 0, 0, 0.25)"
        >
          もう一度遊ぶ
        </Button>
      </Box>
      {/* END */}
    </Box >
  )
}

