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
        quoteAuthor: result.quoteAuthor,
        likedOrDisliked: null
      }))
    );
    this.setState({ fetching: false });
  };

  addQuotesToState = quotes => {
    return this.setState({ quotes });
  };

  createQuoteCards = quotes => {
    return quotes.map(quote => (
      <Quote
        text={quote.quoteText}
        author={quote.quoteAuthor}
        key={quote.id}
        likeQuote={() => this.likeQuote(quote.id)}
        dislikeQuote={() => this.dislikeQuote(quote.id)}
        likedOrDisliked={quote.likedOrDisliked}
      />
    ));
  };

  likeQuote = id => {
    return this.setState({
      quotes: this.state.quotes.map(quote =>
        quote.id === id ? { ...quote, likedOrDisliked: "liked" } : quote
      )
    });
  };

  dislikeQuote = id => {
    return this.setState({
      quotes: this.state.quotes.map(quote =>
        quote.id === id ? { ...quote, likedOrDisliked: "disliked" } : quote
      )
    });
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
