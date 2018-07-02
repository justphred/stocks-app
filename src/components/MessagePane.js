import React from "react";
import "./MessagePane.css";
import PropTypes from "prop-types";

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

MessagePane.propTypes = {
  message: PropTypes.string
}

export default MessagePane;

// bottomline
