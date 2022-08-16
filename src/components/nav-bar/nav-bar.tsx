import React from "react";
import { NavBarItem } from "../nav-bar-item/nav-bar-item";
import { SearchBox } from "../search-box/search-box";

export const NavBar = () => {
  return (
    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div
        className="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse"
      >
        <SearchBox />
        <NavBarItem />
      </div>
    </nav>
  );
};
