import { useEffect, useState } from "react";
import { getBudgets } from "../services/budget-service";
import { Budget } from "../model/Budget";

const useBudgets = () => {
    const [budgets, setBudgets] = useState<Budget[]>([]);
  const [error, setErrors] = useState<string>("");
  const [isLoading, setLoader] = useState<boolean>(false);
  useEffect(() => {
    
    setLoader(true);
    getBudgets()
      .then((response) => {
        setBudgets(response.data);
      })
      .catch((error) => setErrors(error.message))
      .finally(() => setLoader(false));
  }, []);
  return {budgets, error, isLoading};
}

export default useBudgets;