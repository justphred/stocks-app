import React from "react";
import PropTypes from "prop-types";

class SourceCite extends React.Component {

  render () {
    return (
      <div style={{fontSize: ".7em", color: "#F7EB04"}}>
        {this.props.citation}
      </div>
    );
  };
}

SourceCite.propTypes = {
  citation: PropTypes.string
};

export default SourceCite;
