import React from "react";

interface IItems {
  orderID: number;
  item: string;
  country: string;
  date: string;
  units: number;
  channel: string;
}

interface ITable {
  title: string;
  items: IItems[];
}

export const Table: React.FC<ITable> = (props) => {
  return (
    <div className="card">
      <h5 className="card-header">{props.title}</h5>
      <div className="table-responsive text-nowrap">
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Item</th>
              <th>Country</th>
              <th>Date</th>
              <th>Units Sold</th>
              <th>Sales Channel</th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {props.items.map((item) => (
              <tr key={item.orderID}>
                <td>
                  <i className="fab fa-angular fa-lg text-danger me-3"></i>{" "}
                  <span>{item.orderID}</span>
                </td>
                <td>{item.item}</td>
                <td>{item.country}</td>
                <td>{item.date}</td>
                <td>{item.units}</td>
                <td>
                  {item.channel === "Online" ? (
                    <span className="badge bg-label-success me-1">
                      {item.channel}
                    </span>
                  ) : (
                    <span className="badge bg-label-danger me-1">
                      {item.channel}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
