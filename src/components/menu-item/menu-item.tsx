import React from "react";
import { MenuSubItem } from "../menu-sub-item/menu-sub-item";

export const MenuItem = () => {
  return (
    <li className="menu-item">
      <a href="./" className="menu-link menu-toggle">
        <i className="menu-icon tf-icons bx bx-dock-top"></i>
        <div data-i18n="Account Settings">Account Settings</div>
      </a>
      <ul className="menu-sub">
        <MenuSubItem />
      </ul>
    </li>
  );
};
