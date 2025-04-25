import { Expense } from "../model/Expense";
import{PieData} from  "../model/PieData"

export const aggregateByCategory = (expenses: Expense[]): PieData[] => {
    const result: Record<string, number> = {};
  
    expenses.forEach((item) => {
      const cat = item.category;
      const amt = parseFloat(item.amount as string); // 如果是 number 会自动转换
      if (!result[cat]) {
        result[cat] = 0;
      }
      result[cat] += amt;
    });
  
    return Object.entries(result).map(([name, value]) => ({ name, value }));
  };