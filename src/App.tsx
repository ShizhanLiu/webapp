import Dashboard from "./pages/dashboard/Dashboard"

import Navbar from "./component/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/register/Register";
import ExpenseReports from "./pages/expense/ExpenseReports";


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new" element={<Expense />} />
        <Route path="/view" element={<ExpenseDetails />} />
        <Route path="/reports" element={<ExpenseReports />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;