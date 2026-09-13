import { useState, useEffect } from 'react';

interface CountdownResult {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isEnded: boolean;
  formattedText: string;
}

export function useCountdown(endDateString?: string, defaultHours: number = 24): CountdownResult {
  const [targetTime, setTargetTime] = useState<number>(() => {
    // If a fixed end date string is provided, use it
    if (endDateString && !isNaN(new Date(endDateString).getTime())) {
      return new Date(endDateString).getTime();
    }

    // Otherwise use persistent countdown in localStorage
    const storageKey = 'promo_countdown_target_timestamp';
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed > Date.now()) {
        return parsed;
      }
    }

    // Initialize new duration
    const newTarget = Date.now() + defaultHours * 60 * 60 * 1000;
    try {
      localStorage.setItem(storageKey, newTarget.toString());
    } catch {
      // ignore storage write errors
    }
    return newTarget;
  });

  const [timeLeft, setTimeLeft] = useState<number>(() => Math.max(0, targetTime - Date.now()));

  useEffect(() => {
    if (endDateString && !isNaN(new Date(endDateString).getTime())) {
      const parsed = new Date(endDateString).getTime();
      setTargetTime(parsed);
    }
  }, [endDateString]);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, targetTime - Date.now());
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  const isEnded = timeLeft <= 0;

  const totalSeconds = Math.floor(timeLeft / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  const daysStr = pad(days);
  const hoursStr = pad(hours);
  const minutesStr = pad(minutes);
  const secondsStr = pad(seconds);

  return {
    days: daysStr,
    hours: hoursStr,
    minutes: minutesStr,
    seconds: secondsStr,
    isEnded,
    formattedText: isEnded
      ? "OFFER HAS ENDED"
      : `${daysStr} DAYS : ${hoursStr} HOURS : ${minutesStr} MINUTES : ${secondsStr} SECONDS`
  };
}
