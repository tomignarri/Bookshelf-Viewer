import React from "react";
import BookDisplayCard from "./BookDisplayCard";

class BookDisplayContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBookIndex: this.props.selectedBookIndex,
      touchStartX: 0,
      touchCurrentX: 0,
      swipeThreshold: 75
    };
  }

  scrollDisplayBook(newIndex) {
    const bookAmount = this.props.allBooks.length;
    if (newIndex < 0) {
      this.setState({
        selectedBookIndex: bookAmount - 1
      });
      return;
    }
    if (newIndex === bookAmount) {
      this.setState({
        selectedBookIndex: 0
      });
      return;
    }
    this.setState({
      selectedBookIndex: newIndex
    });
  }

  touchStart = event => {
    const touchObj = event.touches[0];
    this.setState({
      touchStartX: touchObj.clientX,

      // Set current on touchStart to prevent touch start where
      // touchMove is not triggered, causing a unintended scroll.
      touchCurrentX: touchObj.clientX
    });
  };

  touchMove = event => {
    const touchObj = event.touches[0];
    this.setState({
      touchCurrentX: touchObj.clientX
    });
  };

  touchEnd = () => {
    if (
      Math.abs(this.state.touchStartX - this.state.touchCurrentX) >
      this.state.swipeThreshold
    ) {
      const swipeDirection =
        this.state.touchStartX > this.state.touchCurrentX ? 1 : -1;
      this.scrollDisplayBook(this.state.selectedBookIndex + swipeDirection);
    }
  };

  render() {
    return (
      <div
        className="d-flex flex-column"
        onTouchStart={this.touchStart}
        onTouchMove={this.touchMove}
        onTouchEnd={this.touchEnd}
      >
        <div className="d-flex justify-content-between">
        <div className="d-flex flex-row-reverse position-fixed p-3 buttonColumn">
            <button
              type="button"
              className="btn btn-light btn-lg d-none d-sm-block d-md-block d-lg-block d-xl-block bookNext"
              onClick={() =>
                this.scrollDisplayBook(this.state.selectedBookIndex + 1)
              }
            >
              <i className="fas fa-long-arrow-alt-right" />
            </button>
            <button
              type="button"
              className="btn btn-light btn-lg d-none d-sm-block d-md-block d-lg-block d-xl-block mr-2 bookNext"
              onClick={() =>
                this.scrollDisplayBook(this.state.selectedBookIndex - 1)
              }
            >
              <i className="fas fa-long-arrow-alt-left" />
            </button>
          </div>

          <div className="d-flex">
            <BookDisplayCard
              currentIndex={this.state.selectedBookIndex}
              currentBook={this.props.allBooks[this.state.selectedBookIndex]}
            />
          </div>
          
        </div>
      </div>
    );
  }
}

export default BookDisplayContainer;
