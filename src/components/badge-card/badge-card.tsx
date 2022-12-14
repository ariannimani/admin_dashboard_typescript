import React from "react";

interface IBadgeCard {
  data: number;
  isOpen: boolean;
  clickHandler: () => void;
}

const Success: React.FC<IBadgeCard> = (props) => {
  return (
    <div className="d-flex align-items-end row">
      <div className="col-sm-7">
        <div className="card-body">
          <h5 className="card-title text-primary">Congratulations John! 🎉</h5>
          <p className="mb-4">
            You have done{" "}
            <span className="fw-bold">{props.data.toFixed(2)}%</span> more
            profit this year.
          </p>
          <button
            className="btn btn-sm btn-outline-primary hover-btn"
            onClick={() => props.clickHandler}
          >
            Close
          </button>
        </div>
      </div>
      <div className="col-sm-5 text-center text-sm-left">
        <div className="card-body pb-0 px-0 px-md-4">
          <img
            src="../assets/img/illustrations/man-with-laptop-light.png"
            height="140"
            alt="View User"
          />
        </div>
      </div>
    </div>
  );
};

const Failed: React.FC<IBadgeCard> = (props) => {
  return (
    <div className="d-flex align-items-end row">
      <div className="col-sm-7">
        <div className="card-body">
          <h5 className="card-title text-primary">Warning John! ⚠️</h5>
          <p className="mb-4">
            You have done{" "}
            <span className="fw-bold">{props.data.toFixed(2)}%</span> less
            profit this year.
          </p>
          <button
            className="btn btn-sm btn-outline-primary hover-btn"
            onClick={props.clickHandler}
          >
            Close
          </button>
        </div>
      </div>
      <div className="col-sm-5 text-center text-sm-left">
        <div className="card-body pb-0 px-0 px-md-4">
          <img
            src="../assets/img/illustrations/page-misc-error-light.png"
            height="140"
            alt="View User"
          />
        </div>
      </div>
    </div>
  );
};

export const BadgeCard: React.FC<IBadgeCard> = (props) => {
  return (
    <div className="card">
      {props.data > 0 ? Success(props) : Failed(props)}
    </div>
  );
};
