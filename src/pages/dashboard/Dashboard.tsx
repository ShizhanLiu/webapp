import ExpenseList from "../../component/ExpenseList";
import useExpenses from "../../hooks/useExpenses";
import { Expense } from "../../model/Expense";
import AppHelper from "../../utils/AppHelper";
import DashboardStatus from "./DashboardStatus";

const Dashboard = () => {
  const loggedInUser: string = AppHelper.getLoggedInUser();

  const { expenses, error, isLoading } = useExpenses();

  const totalExpenses = expenses.reduce(
    (acc: number, expense: Expense) => acc + parseFloat(expense.amount),
    0
  );

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
    </div>
  );
};

export default Dashboard;