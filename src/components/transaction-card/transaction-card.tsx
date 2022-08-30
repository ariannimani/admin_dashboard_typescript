import React, { useRef, useState } from "react";
import DropdownMenu from "../dropdown-menu/dropdown-menu";
import { numberWithCommas } from "../../redux/utils/otherFunctions";
import { useSelector } from "react-redux";
import { selectProfitData } from "../../redux/data/data.selector";

interface ITransactions {
  data: number;
  title: string;
  increase: number;
}

export const TransactionCard: React.FC<ITransactions> = ({
  data,
  title,
  increase,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<string>("Last Month");

  const closeMenuHandler = (e: any) => {
    if (
      TransactionMenu.current &&
      isSelected &&
      !TransactionMenu.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };
  const changeItemHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const item: HTMLButtonElement = event.currentTarget;
    setIsSelected(item.value);
  };
  const TransactionMenu = useRef<HTMLDivElement>(null);

  document.addEventListener("mousedown", closeMenuHandler);
  return (
    <div className="card" ref={TransactionMenu}>
      <div className="card-body">
        <div className="card-title d-flex align-items-start justify-content-between">
          <div className="avatar flex-shrink-0">
            <img
              src="../assets/img/icons/unicons/chart-success.png"
              alt="chart success"
              className="rounded"
            />
          </div>
          <div className="dropdown">
            <button
              className="btn p-0"
              type="button"
              id="cardOpt3"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={() => setIsOpen(!isOpen)}
            >
              <i className="bx bx-dots-vertical-rounded"></i>
            </button>
            {isOpen ? (
              <DropdownMenu
                isOpen={isOpen}
                items={["Last Month", "Last Quarter", "Last Year"]}
                changeItemHandler={changeItemHandler}
                isSelected={isSelected}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <span className="fw-semibold d-block mb-1">{title}</span>
        <h3 className="card-title mb-2">
          $
          {numberWithCommas(
            data.toLocaleString("en", {
              useGrouping: false,
              minimumFractionDigits: 2,
            })
          )}
        </h3>
        <small
          className={`fw-semibold ${
            increase >= 0 ? "text-success" : "text-danger"
          }`}
        >
          <i
            className={`bx ${
              increase >= 0 ? "bx-up-arrow-alt" : "bx-down-arrow-alt"
            }`}
          ></i>{" "}
          {increase.toFixed(2)}%
        </small>
      </div>
    </div>
  );
};
