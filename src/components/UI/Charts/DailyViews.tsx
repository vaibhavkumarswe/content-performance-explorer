import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Point } from "../../../types/api";

const DailyViews = ({ data }: { data: Point[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 25 }}
        height={300}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(tick) => tick.split("-")[2]}
          label={{
            value: "Date",
            position: "bottom",
            offset: 0,
          }}
        />
        <YAxis
          label={{ value: "Volume", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Area
          type="monotone"
          dataKey="pageviews"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.3}
        />
        <Area
          type="monotone"
          dataKey="unique_visitors"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DailyViews;
