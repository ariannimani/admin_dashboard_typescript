import React from "react";
import { formatCash } from "../../redux/utils/otherFunctions";

interface ITransactionItem {
  item: string;
  amount: number;
}

export const TransactionItem: React.FC<ITransactionItem> = ({
  item,
  amount,
}) => {
  return (
    <li className="d-flex mb-4 pb-1">
      <div className="avatar flex-shrink-0 me-3">
        <span className="avatar-initial rounded bg-label-primary">
          <img
            src={require(`../../assets/img/icons/${item
              .split(" ")[0]
              .toLowerCase()}.png`)}
            alt={item}
            className="rounded"
          />
        </span>
      </div>
      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
        <div className="me-2">
          <h6 className="mb-0">{item}</h6>
          <small className="text-muted">{item}</small>
        </div>
        <div className="user-progress">
          <small className="fw-semibold">{formatCash(amount)}</small>
        </div>
      </div>
    </li>
  );
};
