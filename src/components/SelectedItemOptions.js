import React from "react";
import "./SelectedItemOptions.css";
import PropTypes from "prop-types";

// https://stackoverflow.com/questions/14750078/style-disabled-button-with-css

class SelectedItemOptions extends React.Component {

  optionClick = (ev) => {
    let action = ev.target.getAttribute("name");
    console.log("Option choice: " + action);

    this.props.handleOptions(action);
  }

  render() {
    return (
      <div className="si-container">
        <div style={{display: "inline-block",
                      marginRight: ".4em"
                      }} >
          <span className="selectedItemLabel">Selected Item:</span>
          <span className="selectedItemText">
            {!this.props.selected ? "None" : this.props.selected}
          </span>
        </div>
        <span>
          <button name="chart" onClick={this.optionClick}
              className={`${!this.props.selected ? 'btnDisabled' : "btnOptions"}`} >
            Chart
          </button>
        </span>
        <span>
          <button name="edit" onClick={this.optionClick}
              className={`${!this.props.selected ? 'btnDisabled' : "btnOptions"}`}>
            Edit
          </button>
        </span>
        <span>
          <button name="delete" onClick={this.optionClick}
              className={`${!this.props.selected ? 'btnDisabled' : "btnOptions"}`}>
            Delete
          </button>
        </span>

      </div>
    );

  }; // End render()
};

SelectedItemOptions.propTypes = {
  handleOptions: PropTypes.func
};

export default SelectedItemOptions;

// bottomline
