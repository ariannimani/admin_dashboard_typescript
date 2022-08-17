import React from "react";
import { MenuItem } from "../menu-item/menu-item";

export const MenuItems = () => {
  return (
    <aside
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-menu-theme"
    >
      <div className="app-brand demo">
        <a href="index.html" className="app-brand-link">
          <span className="app-brand-text demo menu-text fw-bolder ms-2">
            DASHBOARD
          </span>
        </a>

        <a
          href="./"
          className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
        >
          <i className="bx bx-chevron-left bx-sm align-middle"></i>
        </a>
      </div>

      <div className="menu-inner-shadow"></div>

      <ul className="menu-inner py-1">
        {/* Dashboard */}
        <li className="menu-item active">
          <a href="index.html" className="menu-link">
            <i className="menu-icon tf-icons bx bx-home-circle"></i>
            <div data-i18n="Analytics">Dashboard</div>
          </a>
        </li>

        <li className="menu-header small text-uppercase">
          <span className="menu-header-text">Pages</span>
        </li>
        <MenuItem />
      </ul>
    </aside>
  );
};
