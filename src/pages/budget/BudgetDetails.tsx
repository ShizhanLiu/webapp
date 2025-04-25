import { Link, useNavigate, useParams } from "react-router-dom";
import CurrencyUtils from "../../utils/CurrencyUtils";
import DateUtils from "../../utils/DateUtils";
import ConfirmDialog from "../../component/ConfirmDialog";
import { useState } from "react";
import { deleteBudgetByBudgetId } from "../../services/budget-service";
import useBudgetByBudgetId from "../../hooks/useBudgetByBudgetId";

const BudgetDetails = () => {
  const { budgetId } = useParams<{ budgetId: string }>();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  if (!budgetId) {
    return <p className="text-danger">Invalid budgetId Id</p>;
  }
  const { budget, errors, isLoading, setLoader, setErrors } =
    useBudgetByBudgetId(budgetId);

  const handleCancel = () => {
    console.log("Cancel is clicked");
    setShowDialog(false);
  };

  const handleConfirm = () => {
    setLoader(true);
    deleteBudgetByBudgetId(budgetId)
      .then((response) => {
        if (response && response.status === 204) {
          navigate("/");
        }
      })
      .catch((error) => setErrors(error.message))
      .finally(() => {
        setLoader(false);
        setShowDialog(false);
      });
  };

  return (
    <div className="container mt-2">
      {isLoading && <p>Loading...</p>}
      {errors && <p className="text-danger">{errors}</p>}
      <div className="d-flex flex-row-reverse mb-2">
        <button
          className="btn btn-sm btn-danger"
          onClick={() => setShowDialog(true)}
        >
          Delete
        </button>
        <button
          className="btn btn-sm btn-warning mx-2"
          onClick={() => navigate(`/edit/budget/${budgetId}`)}
        >
          Edit
        </button>
        <Link className="btn btn-sm btn-secondary" to="/">
          Back
        </Link>
      </div>
      <div className="card">
        <div className="card-body p-3">
          <table className="table table-borderless table-responsive">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{budget ? budget.name : "N/A"}</td>
              </tr>
              <tr>
                <th>Budget</th>
                <td>
                  {budget
                    ? CurrencyUtils.formatToUSD(parseFloat(budget.budget))
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <th>Balance</th>
                <td>
                  {budget
                    ? CurrencyUtils.formatToUSD(parseFloat(budget.balance))
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <th>YearMonth</th>
                <td>
                  {budget ? DateUtils.formatDateString(budget.yearmonth) : "N/A"}
                </td>
              </tr>
              <tr>
                <th>Note</th>
                <td>{budget ? budget.note : "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmDialog
        title="Confirm Delete"
        message="Are you sure want to delete this item?"
        show={showDialog}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default BudgetDetails;
