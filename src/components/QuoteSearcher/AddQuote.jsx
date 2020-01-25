import React, { Component } from "react";

export default class AddQuote extends Component {
  state = {
    id: "",
    quoteAuthor: "",
    quoteText: "",
    likedOrDisliked: null
  };

  updateField = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ id: Math.trunc(Math.random() * 1000) });
    this.props.addToQuotesList(this.state);
    this.setState({
      id: "",
      quoteAuthor: "",
      quoteText: "",
      likedOrDisliked: null
    });
  };

  render() {
    return (
      <div>
        <h2>Add your own wisdom</h2>
        <form onSubmit={this.onSubmit}>
          <label>Name</label>
          <input
            name="quoteAuthor"
            type="text"
            value={this.state.quoteAuthor}
            onChange={this.updateField}
          />
          <label>Quote</label>
          <input
            name="quoteText"
            type="text"
            value={this.state.quoteText}
            onChange={this.updateField}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
