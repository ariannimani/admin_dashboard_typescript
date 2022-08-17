import React, { FunctionComponent } from "react";

interface IButton {
  itemName: string;
  expensesActiveHandler: (itemValue: string) => void;
  expenseActive: string;
}
export const Button: FunctionComponent<IButton> = ({
  itemName,
  expensesActiveHandler,
  expenseActive,
}) => {
  return (
    <button
      type="button"
      value={itemName}
      className={`nav-link ${expenseActive === itemName ? "active" : ""}`}
      role="tab"
      onClick={() => expensesActiveHandler(itemName)}
    >
      {itemName}
    </button>
  );
};
