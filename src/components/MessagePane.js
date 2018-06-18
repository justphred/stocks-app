import React from "react";
import "./MessagePane.css";

class MessagePane extends React.Component {

  render() {
    let currMsg = "- - - - -";
    if (this.props.message) {
      currMsg = this.props.message;
    }

    return (
      <div className="msgp-container">{currMsg}</div>
    );

  } // End method render()

}

export default MessagePane;

// bottomline
