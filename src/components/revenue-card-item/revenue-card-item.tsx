import React, { useState } from "react";
import { DropdownMenu } from "../dropdown-menu/dropdown-menu";

export const RevenueCardItem = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const closeMenuHandler = () => {
    setIsOpen(false);
  };

  return (
    <div className="col-md-4">
      <div className="card-body">
        <div className="text-center">
          <div className="dropdown">
            <button
              className="btn btn-sm btn-outline-primary dropdown-toggle"
              type="button"
              id="growthReportId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
              onBlur={closeMenuHandler}
            >
              2022
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
      </div>
      <div id="growthChart"></div>
      <div className="text-center fw-semibold pt-3 mb-2">
        62% Company Growth
      </div>

      <div className="d-flex px-xxl-4 px-lg-2 p-4 gap-xxl-3 gap-lg-1 gap-3 justify-content-between">
        <div className="d-flex">
          <div className="me-2">
            <span className="badge bg-label-primary p-2">
              <i className="bx bx-dollar text-primary"></i>
            </span>
          </div>
          <div className="d-flex flex-column">
            <small>2022</small>
            <h6 className="mb-0">$32.5k</h6>
          </div>
        </div>
        <div className="d-flex">
          <div className="me-2">
            <span className="badge bg-label-info p-2">
              <i className="bx bx-wallet text-info"></i>
            </span>
          </div>
          <div className="d-flex flex-column">
            <small>2021</small>
            <h6 className="mb-0">$41.2k</h6>
          </div>
        </div>
      </div>
    </div>
  );
};