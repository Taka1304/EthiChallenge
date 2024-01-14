import { Container } from "@yamada-ui/react";
import React, { FC } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
type Props = {
  roomState: Room;
};

const Colors = ["#FFB6C1", "#FFFF00", "#FFD700", "#FFA500", "#FF7F50"];

const RoomChart: FC<Props> = ({ roomState }) => {
  const totalScore = (scores: Scores) => {
    return (
      scores.empathy +
      scores.moralReasoning +
      scores.selfKnowledge +
      scores.socialResponsibility +
      scores.theoreticalJudgement
    );
  };
  const data = roomState.players.map((player) => {
    const obj: { [key: string]: string | number } = { name: player.name };
    player.scores.forEach((score, index) => {
      obj[`game${index + 1}`] = totalScore(score);
    });
    return obj;
  });
  console.log(roomState);
  console.log(data);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, roomState.options.gameCount * 100]} />
        <Tooltip />
        <Legend />
        {Array.from({ length: roomState.options.gameCount }, (_, index) => (
          <Bar
            key={`game${index}`}
            dataKey={`game${index + 1}`}
            stackId="a"
            fill={Colors[index]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RoomChart;
