import React from "react";

class SelectedItemOptions extends React.Component {

  render() {
    return (
      <div style={{
                    // display: "inline-block",
                    // border: "1px solid #778096",
                    // marginLeft: ".5em",
                    marginTop: ".2em",
                    padding: ".2em"}}>
        {/* <ul style={{listStyleType: "none", padding: "0", margin: "0"}}>
          <li><span><button>Chart</button></span></li>
          <li><span><button>Edit</button></span></li>
          <li><span><button>Delete</button></span></li>
        </ul> */}
        <div style={{display: "inline-block",
                      marginRight: ".4em"
                      }}>
          <span style={{paddingRight:".25em", color: "#c5cce2"}}>Selected Item:</span>
          <span style={{color: "#e3e6ef"}}>
            {!this.props.selected ? "None" : this.props.selected}
          </span>
        </div>
        <span><button>Chart</button></span>
        <span><button>Edit</button></span>
        <span><button>Delete</button></span>


      </div>
    );

  }; // End render()
};

export default SelectedItemOptions;

// bottomline
