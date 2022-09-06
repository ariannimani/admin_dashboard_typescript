import React from "react";

interface IItems {
  type: string;
  sold: number;
}
interface IStatistics {
  title: string;
  items: IItems[];
}

export const TransactionStatistics: React.FC<IStatistics> = (props) => {
  return (
    <div className="card h-100">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h5 className="card-title m-0 me-2">{props.title}</h5>
      </div>
      <div className="card-body">
        <ul className="p-0 m-0">
          {props.items.map((item) => (
            <li className="d-flex mb-4 pb-1">
              <div className="avatar flex-shrink-0 me-3">
                <img
                  src={require(`../../assets/img/icons/${item.type.toLowerCase()}.png`)}
                  alt={item.type}
                  className="rounded"
                />
              </div>
              <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div className="me-2">
                  <small className="text-muted d-block mb-1">{item.type}</small>
                  {/*<h6 className="mb-0">Send money</h6>*/}
                </div>
                <div className="user-progress d-flex align-items-center gap-1">
                  <h6 className="mb-0">{item.sold}</h6>
                  {/*<span className="text-muted">USD</span>*/}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
