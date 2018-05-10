import React from 'react';

class SearchBar extends React.Component {

  handleUserInput = (event) => {
    if((event.keyCode === 13) && (event.target.value.length > 1)) {
      this.props.getUserInput(event.target.value);
      // alert("New ticker symbol: " + event.target.value);
      event.target.value = "";
    }
  }

  render () {
    return (
      <div style={{"marginTop": ".5em", padding: ".5em"}}>
        <label name="add-symbol">Add Another Symbol: </label>
        <input name="add-symbol" type="text" size="4" maxLength="4"
               placeholder="Symbol" onKeyDown={this.handleUserInput}/>
      </div>
    );
  };
} // End class SearchBar

export default SearchBar;
