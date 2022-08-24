import React, { useState } from "react";
import { Button } from "../button/button";
import { ExpensesItems } from "../expenses-items/expenses-items";

export const ExpensesCard = () => {
  const [expenseActive, setExpenseActive] = useState("Profit");
  const expensesActiveHandler = (itemValue: string) => {
    setExpenseActive(itemValue);
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
