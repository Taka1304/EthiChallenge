import { Heading } from '@yamada-ui/react';
import React, { useEffect, useState } from 'react';

type TimerProps = {
  duration: number;
};

const Timer: React.FC<TimerProps> = ({ duration }) => {
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
      }
    };

    requestAnimationFrame(updateTimer);

    return () => {
      // Cleanup logic if needed
    };
  }, []);

  return (
    <Heading as="p" fontFamily={"monospace"} color={remainingTime > 5 ? 'inherit' : 'red' }>
      {remainingTime.toFixed(2)}
    </Heading>
  );
};

export default Timer;
