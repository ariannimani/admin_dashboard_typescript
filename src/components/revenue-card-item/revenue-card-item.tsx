import React, { useState } from "react";
import { IDataItem } from "../../redux/data/data.types";
import { formatCash } from "../../redux/utils/otherFunctions";
import DropdownMenu from "../dropdown-menu/dropdown-menu";
import { PieChart, Pie, Sector } from "recharts";
import useDidMountEffect from "../../customHooks/useDidMountEffect";

interface IRevenueCardItem {
  selectYear: string[];
  data: IDataItem[];
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fontSize={"10px"}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const RevenueCardItem: React.FC<IRevenueCardItem> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useDidMountEffect(() => {
    setSelectedItem(Number(props.selectYear[0]));
  }, [props.selectYear]);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const closeMenuHandler = () => {
    setIsOpen(false);
  };

  const changeItemHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const item: HTMLButtonElement = event.currentTarget;
    setSelectedItem(Number(item.value));
    closeMenuHandler();
  };

  const filterDataSelectedYear = (selectedYear: number) => {
    return props.data
      .filter(
        (year) => Number(year["Order Date"].slice(-4)) === Number(selectedYear)
      )
      .map((data) => data["Total Profit"])
      .reduce((sum, a) => sum + a, 0);
  };

  const growthData = () => {
    const growth =
      ((filterDataSelectedYear(selectedItem) -
        filterDataSelectedYear(selectedItem - 1)) /
        filterDataSelectedYear(selectedItem)) *
      100;

    return growth;
  };

  const growthDataa = () => {
    return [
      { name: selectedItem, value: filterDataSelectedYear(selectedItem) },
      {
        name: selectedItem - 1,
        value: filterDataSelectedYear(selectedItem - 1),
      },
    ];
  };

  return (
    <div className="col-md-4 d-flex flex-column">
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
            >
              {selectedItem}
            </button>
            {isOpen ? (
              <DropdownMenu
                isOpen={isOpen}
                items={props.selectYear}
                changeItemHandler={changeItemHandler}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div id="growthChart">
        <div className="text-center">Last Two Years Total Sales</div>
        <div className="text-center fw-semibold">
          $
          {formatCash(
            filterDataSelectedYear(selectedItem) +
              filterDataSelectedYear(selectedItem - 1)
          )}
        </div>
        <PieChart width={300} height={300}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={growthDataa()}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
            width={100}
            height={100}
          />
        </PieChart>
      </div>
      <div className="text-center fw-semibold pt-3 mb-2">
        {growthData() > 0
          ? growthData().toFixed(2) + " % Company Growth"
          : growthData().toFixed(2) + " % Company Decline"}
      </div>

      <div className="d-flex px-xxl-4 px-lg-2 p-4 gap-xxl-3 gap-lg-1 gap-3 justify-content-between">
        <div className="d-flex">
          <div className="me-2">
            <span className="badge bg-label-primary p-2">
              <i className="bx bx-dollar text-primary"></i>
            </span>
          </div>
          <div className="d-flex flex-column">
            <small>{selectedItem}</small>
            <h6 className="mb-0">
              ${formatCash(filterDataSelectedYear(selectedItem))}
            </h6>
          </div>
        </div>
        <div className="d-flex">
          <div className="me-2">
            <span className="badge bg-label-info p-2">
              <i className="bx bx-wallet text-info"></i>
            </span>
          </div>
          <div className="d-flex flex-column">
            <small>{Number(selectedItem) - 1}</small>
            <h6 className="mb-0">
              ${formatCash(filterDataSelectedYear(selectedItem - 1))}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueCardItem;
