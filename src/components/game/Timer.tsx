import { Heading } from "@yamada-ui/react";
import { useState, useEffect } from "react";

type TimerProps = {
  duration: number;
  onTimerFinish?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Timer: React.FC<TimerProps> = ({ duration, onTimerFinish }) => {
  const [remainingTime, setRemainingTime] = useState(duration);

  useEffect(() => {
    let startTime = Date.now();

    const updateTimer = () => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000;
      const newTime = Math.max(0, duration - elapsedTime);
      setRemainingTime(Number(newTime.toFixed(2)));

      if (newTime > 0) {
        requestAnimationFrame(updateTimer);
      } else if (onTimerFinish) {
        onTimerFinish(true); // Pass the flag when the timer finishes
      }
    };

    requestAnimationFrame(updateTimer);

    return () => {
      // Cleanup logic if needed
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Heading
      as="span"
      fontFamily={"monospace"}
      color={remainingTime > 5 ? "inherit" : "red"}
    >
      {remainingTime.toFixed(2)}
    </Heading>
  );
};

export default Timer;
