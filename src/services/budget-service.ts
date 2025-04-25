import apiClient from "../config/api-client"
import { Budget } from "../model/Budget"

export const getBudgets = () => {
    return apiClient.get<Budget[]>('/budgets');
}

export const getBudgetByBudgetId = (budgetId: string) => {
    return apiClient.get<Budget>(`/budgets/${budgetId}`);
}

export const deleteBudgetByBudgetId = (budgetId: string) => {
    return apiClient.delete<void>(`/budgets/${budgetId}`);
}

export const saveOrUpdateBudget = (budget: Budget) => {
    if (budget.budgetId !== undefined || budget.budgetId != null) {
        return apiClient.put<Budget>(`/budgets/${budget.budgetId}`, budget);
    }
    return apiClient.post<Budget>(`/budgets`, budget);
}