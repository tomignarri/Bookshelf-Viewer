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

  // gallery sends all books to display
  // book card sends book index
  bookSelected = bookIndex => {
    this.setState({ bookIndex, createDisplay: true });
  };

  renderBookDisplay() {
    if (this.state.createDisplay) {
      return (
        <div className="d-flex flex-column fixed-top bg">
          <div className="d-flex flex-row text-white align-items-center p-2 position-fixed">
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={this.closeBookDisplay}
            >
              close
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
