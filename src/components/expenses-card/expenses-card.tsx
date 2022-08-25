import React, { useState } from "react";
import { Button } from "../button/button";
import { ExpensesItems } from "../expenses-items/expenses-items";
import { useSelector } from "react-redux";
import { selectLast60DaysData } from "../../redux/data/data.selector";
export const ExpensesCard = () => {
  const [expenseActive, setExpenseActive] = useState("Profit");
  const expensesActiveHandler = (itemValue: string) => {
    setExpenseActive(itemValue);
  };
  const selectLast60Days = useSelector(selectLast60DaysData);

  const Profit = () => {
    return selectLast60Days
      .map((data) => data["Total Profit"])
      .reduce((sum, a) => sum + a, 0);
  };

  const Expenses = () => {
    return selectLast60Days
      .map((data) => data["Total Cost"])
      .reduce((sum, a) => sum + a, 0);
  };

  const Revenue = () => {
    return selectLast60Days
      .map((data) => data["Total Revenue"])
      .reduce((sum, a) => sum + a, 0);
  };
  return (
    <div className="card h-100">
      <div className="card-header">
        <ul className="nav nav-pills" role="tablist">
          <li className="nav-item">
            <Button
              itemName="Income"
              expensesActiveHandler={expensesActiveHandler}
              expenseActive={expenseActive}
            />
          </li>
          <li className="nav-item">
            <Button
              itemName="Expenses"
              expensesActiveHandler={expensesActiveHandler}
              expenseActive={expenseActive}
            />
          </li>
          <li className="nav-item">
            <Button
              itemName="Profit"
              expensesActiveHandler={expensesActiveHandler}
              expenseActive={expenseActive}
            />
          </li>
        </ul>
      </div>
      <div className="card-body px-0">
        <ExpensesItems />
      </div>
    </div>
  );
};
