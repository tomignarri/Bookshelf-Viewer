/* eslint-disable react/destructuring-assignment */
import React from "react";
import "../styles/style.css";

class BookThumbnail extends React.Component {
  // Send selected book index number backwards to Gallery component.
  showBookDisplay = index => {
    this.props.bookSelected(index);
  };

  render() {
    return (
      <div className="col-6 col-sm-6 col-md-4 col-lg-3 text-center py-3 my-2 bookCard">
        <div className="box">
          <img
            alt="missing cover"
            src={this.props.book.cover}
            role="button"
            onClick={() => this.showBookDisplay(this.props.index)}
          />
        </div>
      </div>
    );
  }
}

export default BookThumbnail;
