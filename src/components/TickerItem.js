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

  // https://duckduckgo.com/?q=javascript+get+parent+of+clicked+element&t=hg&atb=v58-7ba&ia=qa
  // function new_class(event) {
  //     wTile = event.target.parentNode;
  //     wTile.className = wTile.className + " added-class";
  // }

  // https://stackoverflow.com/questions/842336/is-there-a-way-to-select-sibling-nodes
  // var siblings = n => [...n.parentElement.children].filter(c=>c.nodeType == 1 && c!=n)

  itemClicked = (ev) => {
    console.log("item clicked", ev);
  }

  render() {
    return (
      <li style={this.myStyles} onClick={this.itemClicked} >
                  <p >{this.props.symbol}</p>
                  <p>{this.props.value}</p>
                </li>
    )
  }
} // End component TickerItem

export default TickerItem;
