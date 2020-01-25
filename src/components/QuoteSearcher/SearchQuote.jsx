import React, { Component } from "react";

export default class SearchQuote extends Component {
  state = {
    keyword: ""
  };

  updateKeyword = event => {
    this.setState({ keyword: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.search(this.state.keyword);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.keyword}
            onChange={this.updateKeyword}
          />
          <button type="submit">Search!</button>
        </form>
      </div>
    );
  }
}
