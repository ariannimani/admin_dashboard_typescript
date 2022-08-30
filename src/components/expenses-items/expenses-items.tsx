import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { numberWithCommas } from "../../redux/utils/otherFunctions";

interface IExpensesData {
  name: string;
  value: number;
  pv: number;
  amt: number;
}

interface IExpensesItem {
  item?: IExpensesData[] | undefined;
  balance: number;
}

export const ExpensesItems: React.FC<IExpensesItem> = (props) => {
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
              <h6 className="mb-0 me-1">
                ${numberWithCommas(String(props.balance.toFixed(2)))}
              </h6>
              <small className="text-success fw-semibold">
                <i className="bx bx-chevron-up"></i>
                42.9%
              </small>
            </div>
          </div>
        </div>
        <div id="incomeChart">
          <AreaChart
            width={444}
            height={420}
            data={props.item}
            margin={{ top: 5, right: 40, bottom: 0, left: 20 }}
          >
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d87b"
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </AreaChart>
        </div>
        <div className="d-flex justify-content-center pt-4 gap-2">
          <div className="flex-shrink-0">
            <div id="expensesOfWeek"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
