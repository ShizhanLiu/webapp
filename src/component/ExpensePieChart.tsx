import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { Expense } from "../model/Expense";
import { aggregateByCategory } from "../utils/aggregateByCategory";

interface Props {
  expenses: Expense[];
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FF69B4"];

const ExpensePieChart: React.FC<Props> = ({ expenses }) => {
  const data = aggregateByCategory(expenses);

  return (
    <div style={{ width: "100%", maxWidth: 700, margin: "0 auto" }}>
      <PieChart width={600} height={500}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="middle" align="right" layout="vertical" />
      </PieChart>
    </div>
  );
};

export default ExpensePieChart;
