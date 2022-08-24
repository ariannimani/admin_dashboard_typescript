import React, { PropsWithChildren, useState } from "react";
import { useSelector } from "react-redux";
import { selectOrderData } from "../../redux/data/data.selector";
import { formatCash } from "../../redux/utils/otherFunctions";
import { DropdownMenu } from "../dropdown-menu/dropdown-menu";
import { TransactionItem } from "../transaction-item/transaction-item";

export const OrderStatistics = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectMostSoldItems = useSelector(selectOrderData);
  const closeMenuHandler = () => {
    setIsOpen(false);
  };

  return (
    <div className="card h-100">
      <div className="card-header d-flex align-items-center justify-content-between pb-0">
        <div className="card-title mb-0">
          <h5 className="m-0 me-2">Order Statistics</h5>
          <small className="text-muted">
            {formatCash(
              selectMostSoldItems.reduce(
                (accumulator, object): PropsWithChildren<any> => {
                  return accumulator + object.sold;
                },
                0
              )
            )}{" "}
            Total Sales
          </small>
        </div>
        <div className="dropdown">
          <button
            className="btn p-0"
            type="button"
            id="orederStatistics"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={() => setIsOpen(!isOpen)}
            onBlur={closeMenuHandler}
          >
            <i className="bx bx-dots-vertical-rounded"></i>
          </button>
          {isOpen ? <DropdownMenu isOpen={isOpen} items={["Refresh"]} /> : ""}
        </div>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div id="orderStatisticsChart"></div>
        </div>
        <ul className="p-0 m-0">
          {selectMostSoldItems.map((item) => (
            <TransactionItem
              key={item.type}
              item={item.type}
              amount={item.sold}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
