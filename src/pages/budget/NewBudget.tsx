import { useFormik } from "formik";
import { Budget } from "../../model/Budget";
import budgetValidationSchema from "../../validation/budgetValidationSchema";
import {
  getBudgetByBudgetId,
  saveOrUpdateBudget,
} from "../../services/budget-service";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NewBudget = () => {
  const { budgetId } = useParams<{ budgetId: string }>();
  const navigate = useNavigate();
  const [error, setErrors] = useState<string>("");
  const [isLoading, setLoader] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<Budget>({
    name: "",
    budget: "",
    note: "",
    balance: "",
    yearmonth: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (budgetId) {
      //call the service method to get the exising expense
      setLoader(true);
      getBudgetByBudgetId(budgetId)
        .then((response) => {
          if (response && response.data) {
            setInitialValues(response.data);
          }
        })
        .catch((error) => setErrors(error.message))
        .finally(() => setLoader(false));
    }
  }, [budgetId]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values: Budget) => {
      saveOrUpdateBudget(values)
        .then((response) => {
          if (response && response.status === 201) {
            navigate("/");
          } else if (response && response.status === 200) {
            navigate(`/view/budget/${budgetId}`);
          }
        })
        .catch((error) => {
          setErrors(error.message);
        });
    },
    validationSchema: budgetValidationSchema,
  });
  return (
    <div className="d-flex justify-content-center align-items-center mt-2">
      <div className="container col-md-4 col-sm-8 col-xs-12">
        {error && <p className="text-danger fst-italic">{error}</p>}
        {isLoading && <p>Loading...</p>}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-danger fst-italic">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="budget" className="form-label">
              Budget
            </label>
            <input
              type="number"
              id="budget"
              name="budget"
              className="form-control"
              value={formik.values.budget}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.budget && formik.errors.budget ? (
              <div className="text-danger fst-italic">
                {formik.errors.budget}
              </div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="note" className="form-label">
              Note
            </label>
            <textarea
              id="note"
              name="note"
              className="form-control"
              value={formik.values.note}
              onChange={formik.handleChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="yearmonth" className="form-label">
              YearMonth
            </label>
            <input
              type="date"
              id="yearmonth"
              name="yearmonth"
              className="form-control"
              value={formik.values.yearmonth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.yearmonth && formik.errors.yearmonth ? (
              <div className="text-danger fst-italic">{formik.errors.yearmonth}</div>
            ) : null}
          </div>
          <button
            className="btn btn-sm app-primary-bg-color btn-outline-light"
            type="submit"
          >
            Save
          </button>
          <button
            className="btn btn-sm app-primary-bg-color btn-outline-light"
            type="reset"
            onClick={formik.handleReset}
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBudget;
