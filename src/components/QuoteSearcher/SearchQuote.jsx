import React, { Component } from "react";

export default class SearchQuote extends Component {
  state = {
    keyword: ""
  };

  updateKeyword = e => {
    this.setState({ keyword: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
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
