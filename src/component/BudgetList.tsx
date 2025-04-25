import { Link } from "react-router-dom";
import { Budget } from "../model/Budget";
import CurrencyUtils from "../utils/CurrencyUtils";
import DateUtils from "../utils/DateUtils";

interface Props {
  budgets: Budget[];
}

const BudgetList = ({ budgets }: Props) => {
  return (
    <div className="card">
      <h5 className="card-header">
        Budget
        <span className="float-end">Amount</span>
      </h5>
      <div className="card-body">
        {budgets.map((budget) => (
          <Link
            key={budget.budgetId}
            to={`/view/budget/${budget.budgetId}`}
            style={{ textDecoration: "none" }}
          >
            <div className="d-flex justify-content-between border-bottom-1 p-3 text-dark">
              <div className="card-title m-0">
                <h5>{budget.name}</h5>
                <span className="fst-italic">
                  {DateUtils.formatDateString(budget.yearmonth)}
                </span>
              </div>
              <div className="card-subtitle">
                <span className="badge rounded-pill app-primary-bg-color">
                  {CurrencyUtils.formatToUSD(parseFloat(budget.budget))}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BudgetList;
