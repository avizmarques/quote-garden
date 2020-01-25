import React, { Component } from "react";
import Quote from "./Quote";
import SearchQuote from "./SearchQuote";

export default class QuoteSearcher extends Component {
  state = {
    fetching: false,
    quotes: [],
    noQuotesFound: false
  };

  search = async keyword => {
    try {
      this.setState({ fetching: true });
      const response = await fetch(
        `https://quote-garden.herokuapp.com/quotes/search/${encodeURIComponent(
          keyword
        )}`
      );
      const quotesResponse = await response.json();
      const sortedQuotes = [...quotesResponse.results].sort((a, b) =>
        a.quoteText.localeCompare(b.quoteText)
      );

      sortedQuotes.length === 0
        ? this.setState({ noQuotesFound: `No results for ${keyword}` })
        : this.setState({
            quotes: sortedQuotes
              .filter(
                (result, i) =>
                  i !== sortedQuotes.length - 1 &&
                  result.quoteText !== sortedQuotes[i + 1].quoteText
              )
              .map(result => ({
                id: result._id,
                quoteText: result.quoteText,
                quoteAuthor: result.quoteAuthor,
                likedOrDisliked: null
              })),
            noQuotesFound: false
          });

      this.setState({ fetching: false });
    } catch {
      console.error("Error loading information");
    }
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
    const totalLikesAndDislikes = this.state.quotes.reduce(
      (sumObj, quote) => {
        return quote.likedOrDisliked === "liked"
          ? { ...sumObj, likes: sumObj.likes + 1 }
          : quote.likedOrDisliked === "disliked"
          ? { ...sumObj, dislikes: sumObj.dislikes + 1 }
          : sumObj;
      },
      { likes: 0, dislikes: 0 }
    );

    return (
      <div>
        <h1>Quotes</h1>
        <SearchQuote search={this.search} />
        <h2>
          Likes: {totalLikesAndDislikes.likes} / Dislikes:{" "}
          {totalLikesAndDislikes.dislikes}
        </h2>
        <div>
          {this.state.fetching
            ? "Loading..."
            : this.state.noQuotesFound
            ? this.state.noQuotesFound
            : this.createQuoteCards(this.state.quotes)}
        </div>
      </div>
    );
  }
}
