import { useEffect, useState } from "react";
import { Budget } from "../model/Budget";
import { getBudgetByBudgetId } from "../services/budget-service";

const useBudgetByBudgetId = (budgetId: string) => {
    const [budget, setBudget] = useState<Budget | undefined>();
  const [errors, setErrors] = useState<string>("");
  const [isLoading, setLoader] = useState<boolean>(false);

  useEffect(() => {
    
    setLoader(true);
    getBudgetByBudgetId(budgetId)
    .then((response) => setBudget(response.data))
    .catch((error) => {
        setErrors(error.message);
        console.log(error);
    })
    .finally(() => setLoader(false));
    
  }, []);

  return {budget, errors, isLoading, setLoader, setErrors};
}

export default useBudgetByBudgetId;