import React, { Component } from "react";
import Quote from "./Quote";

export default class QuoteSearcher extends Component {
  state = {
    fetching: true,
    quotes: []
  };

  componentDidMount = async () => {
    const response = await fetch(
      "https://quote-garden.herokuapp.com/quotes/search/hope"
    );
    const quotesResponse = await response.json();
    this.addQuotesToState(
      quotesResponse.results.map(result => ({
        id: result._id,
        quoteText: result.quoteText,
        quoteAuthor: result.quoteAuthor
      }))
    );
    this.setState({ fetching: false });
  };

  addQuotesToState = quotes => {
    return this.setState({ quotes });
  };

  createQuoteCards = quotes => {
    return quotes.map(quote => (
      <Quote text={quote.quoteText} author={quote.quoteAuthor} />
    ));
  };

  render() {
    return (
      <div>
        <h1>Quotes</h1>
        {this.state.fetching
          ? "Loading..."
          : this.createQuoteCards(this.state.quotes)}
      </div>
    );
  }
}
