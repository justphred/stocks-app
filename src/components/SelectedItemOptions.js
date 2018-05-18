import React from "react";

class SelectedItemOptions extends React.Component {

  render() {
    return (
      <div style={{display: "inline-block",
                    border: "1px solid #778096",
                    marginLeft: ".5em",
                    padding: ".2em"}}>
        <ul style={{listStyleType: "none", padding: "0", margin: "0"}}>
          <li><span><button>Chart</button></span></li>
          <li><span><button>Edit</button></span></li>
          <li><span><button>Delete</button></span></li>
        </ul>
        <div>{!this.props.selected ? "None" : this.props.selected}</div>  
      </div>
    );

  }; // End render()
};

export default SelectedItemOptions;

// bottomline
