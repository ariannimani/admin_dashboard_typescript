import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Footer } from "./components/footer/footer";
import { NavBar } from "./components/nav-bar/nav-bar";
import { BadgeCard } from "./components/badge-card/badge-card";
import { TransactionCard } from "./components/transaction-card/transaction-card";
import { RevenueCard } from "./components/revenue-card/revenue-card";
import { ProfileReportCard } from "./components/profile-report-card/profile-report-card";
import { ExpensesCard } from "./components/expenses-card/expenses-card";
import { TransactionStatistics } from "./components/transactions-statistics/transaction-statistics";
import { OrderStatistics } from "./components/order-statistics/order-statistics";
import { MenuItems } from "./components/menu-items/menu-items";
import "./App.css";
import { useDispatch } from "react-redux";
import { AppDispatch, fetchDataAsync } from "./redux/data/data.action";
import { useSelector } from "react-redux";
import {
  selectProfitData,
  selectTotalIncreaseData,
} from "./redux/data/data.selector";

export const App = () => {
  const dispatch: any = useDispatch<AppDispatch>();
  const selectProfit = useSelector(selectProfitData);
  const selectTotalIncrease = useSelector(selectTotalIncreaseData);

  useEffect(() => {
    dispatch(fetchDataAsync());
  }, [dispatch]);

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <MenuItems />
        <div className="layout-page">
          <NavBar />
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row">
                <div className="col-lg-8 mb-4 order-0">
                  <BadgeCard />
                </div>
                <div className="col-lg-4 col-md-4 order-1">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-6 mb-4">
                      <TransactionCard
                        data={selectProfit}
                        title={"Profit"}
                        increase={selectTotalIncrease}
                      />
                    </div>
                    <div className="col-lg-6 col-md-12 col-6 mb-4">
                      <TransactionCard
                        data={selectProfit}
                        title={"Profit"}
                        increase={selectTotalIncrease}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
                  <RevenueCard />
                </div>
                <div className="col-12 col-md-8 col-lg-4 order-3 order-md-2">
                  <div className="row">
                    <div className="col-6 mb-4">{/*<TransactionCard />*/}</div>
                    <div className="col-6 mb-4">{/*<TransactionCard />*/}</div>
                    <div className="col-12 mb-4">
                      <ProfileReportCard />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-4 col-xl-4 order-0 mb-4">
                  <OrderStatistics />
                </div>
                <div className="col-md-6 col-lg-4 order-1 mb-4">
                  <ExpensesCard />
                </div>
                <div className="col-md-6 col-lg-4 order-2 mb-4">
                  <TransactionStatistics />
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
  );
};
