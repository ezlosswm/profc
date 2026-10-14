"use client";
import { useCountdown } from "@/hooks/useCountdown";

export function Countdown({ startsAt }: { startsAt: string }) {
  const { days, hours, minutes, seconds, done } = useCountdown(startsAt);

  if (done) {
    return (
      <p className="font-display text-3xl uppercase text-blood" role="status">
        Fight night is live
      </p>
    );
  }

  const units = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Min" },
    { value: seconds, label: "Sec" },
  ];

  return (
    <div
      className="flex items-stretch divide-x divide-white/15 border-y border-white/15"
      role="timer"
      aria-label={`${days} days, ${hours} hours, ${minutes} minutes until fight night`}
    >
      {units.map((u) => (
        <div
          key={u.label}
          className="flex min-w-18 flex-col px-4 py-3 first:pl-0 sm:min-w-22"
        >
          <span
            className="font-heading text-4xl tabular-nums leading-none sm:text-5xl"
            aria-hidden="true"
          >
            {String(u.value).padStart(2, "0")}
          </span>
          <span
            className="mt-2 text-xs font-medium text-muted"
            aria-hidden="true"
          >
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
