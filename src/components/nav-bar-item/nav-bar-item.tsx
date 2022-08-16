import React from "react";
import { ProfileAvatar } from "../profile-avatar/profile-avatar";

export const NavBarItem = () => {
  return (
    <ul className="navbar-nav flex-row align-items-center ms-auto">
      <li className="nav-item navbar-dropdown dropdown-user dropdown">
        <ProfileAvatar />
      </li>
    </ul>
  );
};
