import React from "react";

class SourceCite extends React.Component {

  render () {
    return (
      <div style={{fontSize: ".7em", color: "#F7EB04"}}>
        {this.props.citation}
      </div>
    );
  };
}

export default SourceCite;
