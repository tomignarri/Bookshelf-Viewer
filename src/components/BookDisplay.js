import React from "react";
import BookDisplayCard from "./BookDisplayCard";

class BookDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBookIndex: this.props.selectedBookIndex,
      touchStartX: 0,
      touchCurrentX: 0,
      swipeThreshold: 75
    };
  }

  // Iterate displayed book and handle being at
  // the end or the beginning of the array.
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

  // Touchscreen touches start.
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

  // Find the difference between touch start and end along
  // the x-axis to determine the direction of the swipe.
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
        <div className="d-flex flex-row justify-content-between px-3">
          <div className="d-flex flex-column justify-content-center buttonColumn">
            <button
              type="button"
              className="btn btn-light btn-lg d-none d-md-block d-lg-block d-xl-block bookNext"
              onClick={() =>
                this.scrollDisplayBook(this.state.selectedBookIndex - 1)
              }
            >
              <i className="fas fa-long-arrow-alt-left" />
            </button>
          </div>
          <div className="container-fluid">
            {/* send data to bookdisplaycard */}
            <BookDisplayCard
              currentIndex={this.state.selectedBookIndex}
              currentBook={this.props.allBooks[this.state.selectedBookIndex]}
            />
            {/* render next book */}
          </div>
          <div className="d-flex flex-column justify-content-center buttonColumn">
            <button
              type="button"
              className="btn btn-light btn-lg d-none d-md-block d-lg-block d-xl-block bookNext"
              onClick={() =>
                this.scrollDisplayBook(this.state.selectedBookIndex + 1)
              }
            >
              <i className="fas fa-long-arrow-alt-right" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default BookDisplay;
