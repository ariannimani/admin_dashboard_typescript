import React, { useState } from "react";
import { useSelector } from "react-redux";
import useDidMountEffect from "../../customHooks/useDidMountEffect";
import {
  selectAllData,
  selectRegionCollection,
  selectYears,
} from "../../redux/data/data.selector";
import DropdownMenu from "../dropdown-menu/dropdown-menu";
import RevenueCardItem from "../revenue-card-item/revenue-card-item";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const RevenueCard = () => {
  const selectRegion = useSelector(selectRegionCollection);
  const selectAllDataDays = useSelector(selectAllData);
  const selectYear = useSelector(selectYears);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<string>(selectRegion[0]);

  const Data = () => {
    return selectAllDataDays
      .filter((region) => region["Region"] === selectedRegion)
      .map((i) => {
        return {
          date: i["Order Date"],
          revenue: i["Total Revenue"],
          profit: i["Total Profit"],
          expenses: i["Total Cost"],
        };
      })
      .sort((a, b) => (Date.parse(a.date) > Date.parse(b.date) ? 1 : -1));
  };

  const closeMenuHandler = () => {
    setIsOpen(false);
  };

  useDidMountEffect(() => {
    setSelectedRegion(selectRegion[0]);
  }, [selectRegion]);

  const changeItemHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const item: HTMLButtonElement = event.currentTarget;
    setSelectedRegion(item.value);
    closeMenuHandler();
  };
  return (
    <div className="card">
      <div className="col-md-8 d-flex flex-column ">
        <div className="card-header d-flex flex-row justify-content-around">
          <h5 className="m-0 me-2 pb-3">Total Revenue</h5>
          <div className="dropdown">
            <button
              className="btn btn-sm btn-outline-primary dropdown-toggle"
              type="button"
              id="growthReportId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
              //onBlur={closeMenuHandler}
            >
              {selectedRegion}
            </button>
            {isOpen ? (
              <DropdownMenu
                isOpen={isOpen}
                items={selectRegion}
                changeItemHandler={changeItemHandler}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="row row-bordered g-0">
        <div className="col-md-8 d-flex flex-column justify-content-between align-items-center">
          <div id="totalRevenueChart" className="px-2">
            <ComposedChart
              width={600}
              height={480}
              data={Data()}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="date" scale="band" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                fill="#8884d8"
                stroke="#8884d8"
              />
              <Bar dataKey="profit" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="expenses" stroke="#ff7300" />
            </ComposedChart>
          </div>
        </div>
        <RevenueCardItem
          data={selectAllDataDays}
          selectYear={selectYear
            .filter((v, i, a) => a.indexOf(v) === i)
            .sort((a, b) => (Date.parse(a) < Date.parse(b) ? 1 : -1))}
        />
      </div>
    </div>
  );
};

export default RevenueCard;
