import { useAtom } from "jotai";
import React, { FC } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import { playerAtom } from "~/globalState/atoms";

type Props = {
  roomState: Room;
};

type RaderData = {
  Evaluation: string;
  fullMark: number;
} & {
  [key: string]: number | string;
};
const Colors = ["#FFB6C1", "#FFFF00", "#FFD700", "#FFA500", "#FF7F50"];

const scoreTypes: Evaluation[] = [
  "theoreticalJudgement",
  "moralReasoning",
  "empathy",
  "socialResponsibility",
  "selfKnowledge",
];

const PersonalRaderChart: FC<Props> = ({ roomState }) => {
  const [player] = useAtom(playerAtom);

  const data: RaderData[] = scoreTypes.map((scoreType) => {
    let obj: { [key: string]: number | string } = {};

    Array.from({ length: roomState.options.gameCount }, (_, i) => {
      // console.log(i);
      obj[`game${i + 1}`] = player.scores[i][scoreType];
    });
    // console.log(obj);
    return Object.assign(obj, {
      Evaluation: scoreType,
      fullMark: 20,
    });
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="Evaluation" />
        <PolarRadiusAxis angle={90} domain={[0, 20]} />
        {Array.from({ length: roomState.options.gameCount }, (_, i) => (
          <Radar
            key={`${i}game`}
            name={`game${i + 1}`}
            dataKey={`game${i + 1}`}
            stroke={Colors[i]}
            fill={Colors[i]}
            fillOpacity={0.6}
          />
        ))}
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default PersonalRaderChart;
