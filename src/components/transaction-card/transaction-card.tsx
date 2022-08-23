import React, { useState } from "react";
import { DropdownMenu } from "../dropdown-menu/dropdown-menu";

export const TransactionCard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const closeMenuHandler = () => {
    setIsOpen(false);
  };
  return (
    <div className="card">
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
              onBlur={closeMenuHandler}
            >
              <i className="bx bx-dots-vertical-rounded"></i>
            </button>
            {/*{isOpen ? (
              <DropdownMenu
                isOpen={isOpen}
                items={[]}
                setSelectedItem={setSelectedItem}
              />
            ) : (
              ""
            )}*/}
          </div>
        </div>
        <span className="fw-semibold d-block mb-1">Profit</span>
        <h3 className="card-title mb-2">$12,628</h3>
        <small className="text-success fw-semibold">
          <i className="bx bx-up-arrow-alt"></i> +72.80%
        </small>
      </div>
    </div>
  );
};
