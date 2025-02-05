import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "July", desktop: 214 },
  { month: "August", desktop: 214 },
  { month: "September", desktop: 214 },
  { month: "October", desktop: 214 },
];
const chartConfig = {
  desktop: {
    label: "Employees",
    color: "#6f52f4",
  },
} satisfies ChartConfig;
export function DashboardBarChart() {
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="flex pt-6 px-8 justify-between mb-4">
        <h2 className="font-medium">Job statistics</h2>
        <div className="flex items-center gap-2">
          <span className="bg-primary_purple rounded-full w-2 h-2"></span>
          <span className="font-bold">Employees</span>
        </div>
      </div>
      <div className="px-4">
        <ChartContainer
          config={chartConfig}
          className="max-h-[150px] 2xl:max-h-[230px] w-full"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={6}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={12} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
