import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface IDropdownItem {
  itemName: string;
}
export const DropdownItem: FunctionComponent<IDropdownItem> = () => {
  const itemName = "A";
  return (
    <Link className="dropdown-item" to="./">
      {itemName}
    </Link>
  );
};
