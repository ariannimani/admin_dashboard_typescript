import React from "react";

export const ExpensesItems = () => {
  return (
    <div className="tab-content p-0">
      <div
        className="tab-pane fade show active"
        id="navs-tabs-line-card-income"
        role="tabpanel"
      >
        <div className="d-flex p-4 pt-3">
          <div className="avatar flex-shrink-0 me-3">
            <img src="../assets/img/icons/unicons/wallet.png" alt="User" />
          </div>
          <div>
            <small className="text-muted d-block">Total Balance</small>
            <div className="d-flex align-items-center">
              <h6 className="mb-0 me-1">$459.10</h6>
              <small className="text-success fw-semibold">
                <i className="bx bx-chevron-up"></i>
                42.9%
              </small>
            </div>
          </div>
        </div>
        <div id="incomeChart"></div>
        <div className="d-flex justify-content-center pt-4 gap-2">
          <div className="flex-shrink-0">
            <div id="expensesOfWeek"></div>
          </div>
          <div>
            <p className="mb-n1 mt-1">Expenses This Week</p>
            <small className="text-muted">$39 less than last week</small>
          </div>
        </div>
      </div>
    </div>
  );
};