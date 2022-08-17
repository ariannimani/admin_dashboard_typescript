import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface IDropdownMenu {
  isOpen: boolean;
}

export const DropdownMenu: FunctionComponent<IDropdownMenu> = ({
  isOpen,
}): JSX.Element => {
  return (
    <div
      className={`dropdown-menu dropdown-menu-end ${isOpen ? "show" : ""}`}
      aria-labelledby="cardOpt3"
    >
      <Link className="dropdown-item" to="./">
        View
      </Link>
      <Link className="dropdown-item" to="./">
        Delete
      </Link>
    </div>
  );
};
