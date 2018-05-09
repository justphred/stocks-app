import React from "react";

class TickerItem extends React.Component {
  myStyles = {display: "inline-block",
              "padding-top":".25em",
              "padding-bottom":".25em",
              "padding-right":"1em",
              "padding-left":"1em",
              margin: ".5em",
              "background-color": "#c5cce2",
              "border-radius": ".45em",
              border: "1px solid #343b49"
            }

  render() {
    return (
      <li style={this.myStyles}>
                  <p>{this.props.symbol}</p>
                  <p>{this.props.value}</p>
                </li>
    )
  }
} // End component TickerItem

export default TickerItem;
