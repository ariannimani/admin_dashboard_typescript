import { FunctionComponent } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectTimeFrameValue } from "../../redux/data/data.selector";

interface IDropdownMenu {
  isOpen: boolean;
  items: string[];
  isSelected?: string;
  changeItemHandler?: React.MouseEventHandler<HTMLButtonElement>;
}

const DropdownMenu: FunctionComponent<IDropdownMenu> = (props): JSX.Element => {
  return (
    <div
      className={`dropdown-menu dropdown-menu-end ${
        props.isOpen ? "show" : ""
      }`}
      aria-labelledby="cardOpt3"
    >
      {props.items.map((item: string) => (
        <button
          key={item}
          className="dropdown-item btn btn-link"
          value={item}
          type="button"
          onClick={props.changeItemHandler}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  selectTimeFrameValue,
});
export default connect(mapStateToProps)(DropdownMenu);
