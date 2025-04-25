import  useExpenses  from "../../hooks/useExpenses.ts"; // 你可能已经有的hook
import ExpensePieChart from "../../component/ExpensePieChart.tsx"; // 之前做好的PieChart组件

const ExpenseReports = () => {
  const { expenses, isLoading, error } = useExpenses();

  if (isLoading) return <p>Loading expenses...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Expense Reports by Category</h2>
      <ExpensePieChart expenses={expenses} />
    </div>
  );
};

export default ExpenseReports;
