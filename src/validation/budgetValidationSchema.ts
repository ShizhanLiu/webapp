import * as Yup from "yup";

const budgetValidationSchema = Yup.object({
  name: Yup.string().required("Budget name is required")
      .min(3, 'Budget name should be at least 3 characters long'),
  budget: Yup.number()
    .required('Budget amount is required')
    .positive('Budget amount must be greater than 0'),
  yearmonth: Yup.date().required('Budget date is required')
});

export default budgetValidationSchema;