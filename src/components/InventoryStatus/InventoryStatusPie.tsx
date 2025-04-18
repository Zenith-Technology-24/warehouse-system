/* eslint-disable @typescript-eslint/no-explicit-any */
import { PieChart, Pie, Cell, Tooltip } from "recharts";
const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

interface DataItem {
  counts?: {
    highStock: number;
    midStock: number;
    lowStock: number;
    outOfStock: number;
    total: number;
  };
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const InventoryStatusPie: React.FC<DataItem> = ({ counts }) => {
  const data = [
    { name: "High Stock", value: counts?.highStock || undefined },
    { name: "Mid Stock", value: counts?.midStock || undefined },
    { name: "Low Stock", value: counts?.lowStock || undefined },
    { name: "Out of Stock", value: counts?.outOfStock || undefined},
  ];

  return (
    <PieChart width={500} height={600}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={200}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="value"
      >
        {/* Create an object entries for the counts objects */}
        {Object.entries(counts || {}).map(([key, value], index) => (
          <Cell
            key={`cell-${index}-${key}-${value}`}
            fill={COLORS[index % COLORS.length]}
            stroke="white"
            strokeWidth={2}
          />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default InventoryStatusPie;
