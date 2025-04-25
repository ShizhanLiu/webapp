import ExpenseList from "../../component/ExpenseList";
import useExpenses from "../../hooks/useExpenses";
import { Expense } from "../../model/Expense";
import AppHelper from "../../utils/AppHelper";
import DashboardStatus from "./DashboardStatus";
import BudgetList from "../../component/BudgetList";
import useBudgets from "../../hooks/useBudgets";


const Dashboard = () => {
  const loggedInUser: string = AppHelper.getLoggedInUser();

  var { expenses, error, isLoading } = useExpenses();

  const totalExpenses = expenses.reduce(
    (acc: number, expense: Expense) => acc + parseFloat(expense.amount),
    0
  );

  var { budgets, error, isLoading } = useBudgets();

  return (
    <div className="container">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <DashboardStatus
        loggedInUser={loggedInUser}
        totalExpenses={totalExpenses}
      />
      <hr />
      <ExpenseList expenses={expenses} />
      <BudgetList budgets={budgets} />
    </div>
  );
};

export default Dashboard;
