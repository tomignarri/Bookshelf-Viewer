import React from "react";
import BookCard from "./BookCard";
import BookDisplay from "./BookDisplay";
import "../styles/style.css";

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookIndex: 0,
      createDisplay: false
    };
  }

  // Gallery receives book index from book card sends
  // selected index to BookDisplay.
  bookSelected = bookIndex => {
    this.setState({ bookIndex, createDisplay: true });
  };

  renderBookDisplay() {
    if (this.state.createDisplay) {
      return (
        <div className="d-flex fixed-top bg">
          <div className="d-flex flex-row text-white align-items-center p-3 position-fixed">
            <button
              type="button"
              className="btn btn-light text-dark"
              onClick={this.closeBookDisplay}
              aria-label="Close"
            >
              <h3>x</h3>
            </button>
          </div>
          <div className="d-flex flex-row text-center">
            {this.props.books[0].author}
          </div>

          <BookDisplay
            selectedBookIndex={this.state.bookIndex}
            allBooks={this.props.books}
          />
        </div>
      );
    }
    return <div />;
  }

  closeBookDisplay = event => {
    event.preventDefault();
    this.setState({ createDisplay: false });
  };

  render() {
    const books = this.props.books.map((book, index) => {
      return (
        <BookCard
          key={book.id}
          book={book}
          bookSelected={this.bookSelected}
          index={index}
        />
      );
    });

    return (
      <div>
        {this.renderBookDisplay()}

        <div className="row">{books}</div>
      </div>
    );
  }
}

export default Gallery;
