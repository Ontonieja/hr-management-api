import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
type ChartConfigKey = keyof typeof chartConfig;

const chartData: {
  browser: string;
  employees: number;
  fill: string;
  configKey: ChartConfigKey;
}[] = [
  {
    browser: "IT",
    employees: 275,
    fill: "#F4B554",
    configKey: "chrome",
  },
  {
    browser: "HR",
    employees: 200,
    fill: "#01AE70",
    configKey: "safari",
  },
  {
    browser: "Finance",
    employees: 187,
    fill: "#7254F2",
    configKey: "firefox",
  },
  {
    browser: "Sales",
    employees: 187,
    fill: "#FF5733",
    configKey: "edge",
  },
];

const chartConfig = {
  chrome: {
    label: "IT",
    color: "#FFC107",
  },
  safari: {
    label: "HR",
    color: "#01AE70",
  },
  firefox: {
    label: "Finance",
    color: "#7254F2",
  },
  edge: {
    label: "Sales",
    color: "#FF5733",
  },
} satisfies Omit<ChartConfig, "visitors">;

console.log(chartConfig["chrome"].color);

export function DashboardPieChart() {
  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="employees"
              nameKey="browser"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex gap-4 lg:gap-2 xl:gap-4 justify-center text-sm">
        {chartData.map((entry) => {
          const color = chartConfig[entry.configKey]?.color;
          return (
            <div
              key={entry.browser}
              className="flex items-center gap-2 lg:text-xs xl:text-sm font-semibold"
            >
              <span
                className="size-3 rounded-full"
                style={{ backgroundColor: color }}
              ></span>
              <span>{entry.browser}</span>
            </div>
          );
        })}
      </CardFooter>
    </Card>
  );
}
