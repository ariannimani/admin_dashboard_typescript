import { FunctionComponent } from "react";

interface IDropdownMenu {
  isOpen: boolean;
  items: string[];
  changeItemHandler?: React.MouseEventHandler<HTMLButtonElement>;
}

export const DropdownMenu: FunctionComponent<IDropdownMenu> = ({
  isOpen,
  items,
  changeItemHandler,
}): JSX.Element => {
  return (
    <div
      className={`dropdown-menu dropdown-menu-end ${isOpen ? "show" : ""}`}
      aria-labelledby="cardOpt3"
    >
      {items.map((item: string) => (
        <button
          key={item}
          className="dropdown-item btn btn-link"
          value={item}
          type="button"
          onClick={changeItemHandler}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
