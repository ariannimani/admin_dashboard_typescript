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

  const Revenue = () => {
    return selectLast60Days
      .map((i) => {
        return {
          name: i["Order Date"],
          value: i["Total Revenue"],
          pv: i["Total Revenue"],
          amt: i["Total Revenue"],
        };
      })
      .sort((a, b) => (Date.parse(a.name) > Date.parse(b.name) ? 1 : -1));
  };

  const Expenses = () => {
    return selectLast60Days
      .map((i) => {
        return {
          name: i["Order Date"],
          value: i["Total Cost"],
          pv: i["Total Cost"],
          amt: i["Total Cost"],
        };
      })
      .sort((a, b) => (Date.parse(a.name) > Date.parse(b.name) ? 1 : -1));
  };

  const Profit = () => {
    return selectLast60Days
      .map((i) => {
        return {
          name: i["Order Date"],
          value: i["Total Profit"],
          pv: i["Total Profit"],
          amt: i["Total Profit"],
        };
      })
      .sort((a, b) => (Date.parse(a.name) > Date.parse(b.name) ? 1 : -1));
  };

  const Items = () => {
    if (expenseActive === "Income") {
      return Revenue();
    } else if (expenseActive === "Expenses") {
      return Expenses();
    } else if (expenseActive === "Profit") {
      return Profit();
    }
  };

  const Balance = () => {
    return Profit()
      .map((data) => data.value)
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
        <ExpensesItems item={Items()} balance={Balance()} />
      </div>
    </div>
  );
};
