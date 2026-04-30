import dayjs from "dayjs";
import type { SummaryData } from "../types/api";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
};

export const transformStats = (data: SummaryData): any[] => {
  return Object.entries(data).map(([key, value]) => {
    let formattedValue = value.value;
    let formattedprevValue = value.prevValue;
    if (key === "avg_time_on_page") {
      formattedValue = formatTime(value.value);
      formattedprevValue = formatTime(value.prevValue);
    }

    if (key === "bounce_rate") {
      formattedValue = `${value.value}%`;
      formattedprevValue = `${value.prevValue}%`;
    }

    return {
      key,
      label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      value: formattedValue,
      rawValue: value.value,
      trend: value.trend,
      prev: formattedprevValue
    };
  });
};

export const todayDate = () => {
  const today = new Date();
  return dayjs(today);
}
