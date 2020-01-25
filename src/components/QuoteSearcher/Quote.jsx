import React, { Component } from "react";

export default class Quote extends Component {
  styleParagraph = quoteLikedOrDisliked => {
    return !quoteLikedOrDisliked
      ? { color: "black" }
      : quoteLikedOrDisliked === "liked"
      ? { fontWeight: "bold", color: "green" }
      : { color: "red", textDecoration: "line-through red" };
  };

  render() {
    return (
      <div>
        <p style={this.styleParagraph(this.props.likedOrDisliked)}>
          {this.props.text}
        </p>
        <p>By: {this.props.author}</p>
        <button onClick={this.props.likeQuote}>:)</button>
        <button onClick={this.props.dislikeQuote}>:(</button>
      </div>
    );
  }
}
