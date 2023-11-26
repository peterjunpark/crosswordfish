"use client";

import React from "react";
import { useGameStore } from "@/lib/store";

export function Stopwatch() {
  const isStarted = useGameStore((state) => state.game.isStarted);
  const [time, setTime] = React.useState(0);

  const formatTime = React.useCallback(
    (value: number) =>
      Math.floor((time % value) / (value / 60)).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
    [time],
  );

  React.useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isStarted) {
      intervalId = setInterval(() => setTime((prevTime) => prevTime + 1), 10);
    }

    return () => clearInterval(intervalId);
  }, [isStarted]);

  const minutes = formatTime(360000);
  const seconds = formatTime(6000);

  return (
    <span className="font-mono text-3xl font-bold">
      {minutes}:{seconds}
    </span>
  );
}
