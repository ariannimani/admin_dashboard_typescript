import React, { useState } from "react";
import { useSelector } from "react-redux";
import useDidMountEffect from "../../customHooks/useDidMountEffect";
import { selectRegionCollection } from "../../redux/data/data.selector";
import { DropdownMenu } from "../dropdown-menu/dropdown-menu";
import { RevenueCardItem } from "../revenue-card-item/revenue-card-item";

export const RevenueCard = () => {
  const selectRegion = useSelector(selectRegionCollection);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const closeMenuHandler = () => {
    setIsOpen(false);
  };

  useDidMountEffect(() => {
    setSelectedItem(selectRegion[0]);
  }, []);

  const changeItemHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const item: HTMLButtonElement = event.currentTarget;
    setSelectedItem(item.value);
  };
  return (
    <div className="card">
      <div className="row row-bordered g-0">
        <div className="col-md-8">
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
                onBlur={closeMenuHandler}
              >
                {selectedItem}
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
          <div id="totalRevenueChart" className="px-2"></div>
        </div>
        <RevenueCardItem />
      </div>
    </div>
  );
};
