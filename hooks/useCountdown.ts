"use client";

import { useEffect, useState } from "react";

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function compute(target: number): CountdownParts {
  const diff = Math.max(0, target - Date.now());

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
    done: diff === 0,
  };
}

export function useCountdown(iso: string): CountdownParts {
  const [parts, setParts] = useState<CountdownParts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    done: false,
  });

  useEffect(() => {
    const target = Date.parse(iso);

    const update = () => {
      if (!Number.isFinite(target)) {
        setParts({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          done: true,
        });
        return;
      }

      setParts(compute(target));
    };

    update();

    const interval = window.setInterval(update, 1000);

    return () => window.clearInterval(interval);
  }, [iso]);

  return parts;
}
