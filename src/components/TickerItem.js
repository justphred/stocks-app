import React from "react";

class TickerItem extends React.Component {
  myStyles = {display: "inline-block",
              "paddingTop":".25em",
              "paddingBottom":".25em",
              "paddingRight":"1em",
              "paddingLeft":"1em",
              margin: ".5em",
              "backgroundColor": "#c5cce2",
              "borderRadius": ".45em",
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
