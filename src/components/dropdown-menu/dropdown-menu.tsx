import { FunctionComponent } from "react";
import { Button } from "react-bootstrap";

interface IDropdownMenu {
  isOpen: boolean;
  items: string[];
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}

export const DropdownMenu: FunctionComponent<IDropdownMenu> = ({
  isOpen,
  items,
  setSelectedItem,
}): JSX.Element => {
  return (
    <div
      className={`dropdown-menu dropdown-menu-end ${isOpen ? "show" : ""}`}
      aria-labelledby="cardOpt3"
    >
      {items.map((item: string) => (
        <Button
          key={item}
          className="dropdown-item"
          onClick={() => setSelectedItem(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};
