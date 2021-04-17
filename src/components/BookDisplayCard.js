import React from "react";
import LoadingIcon from "./LoadingIcon";

class BookDisplayCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coverUrl: "",
      loadingCover: false
    };
  }

  fetchImage = async () => {
    this.setState({ loadingCover: true });
    try {
      const coverUrl = await `http://covers.openlibrary.org/b/isbn/${this.props.currentBook.isbn}-L.jpg`;
      this.chooseImage(coverUrl);
    } catch (error) {
      this.setState({ loadingCover: false });
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status >= 400 && error.response.status < 500) {
          alert("Search input not accepted.");
        } else if (
          error.response.status >= 500 &&
          error.response.status < 600
        ) {
          alert("Server cannot be accessed.");
        }
        alert(error.response.statusText);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
      alert("Image could not be found.");
    }
  };

  // Get the size of the image and determine if it is above
  // 1x1 pixel. This is to handle blank jpg endpoints from Open Library.
  chooseImage = async coverUrl => {
    const getSize = new Promise(resolve => {
      const img = new Image();
      img.addEventListener("load", function() {
        if (this.naturalWidth > 1) {
          resolve(true);
        }
        resolve(false);
      });
      img.src = coverUrl;
    });

    // Wait for resolve that says the fetched jpg is blank,
    // to prevent thumbnail cover for being set prematurely.
    const coverAvailable = await getSize;
    if (coverAvailable) {
      this.setState({ coverUrl, loadingCover: false });
    } else if (!coverAvailable) {
      this.setState({
        coverUrl: this.props.currentBook.cover,
        loadingCover: false
      });
    }
  };

  componentDidMount() {
    this.fetchImage();
  }

  // Track for a different book to know when a user has scrolled
  // to the next or previous book.
  componentDidUpdate(prevProps) {
    if (this.props.currentBook !== prevProps.currentBook) {
      this.fetchImage();
    }
  }

  render() {
    return (
      <div className="d-flex flex-sm-row flex-column displayFull">
        <div className="text-white text-center p-1 bookDisplayContent">
          {this.state.loadingCover ? (
            <LoadingIcon />
          ) : (
            <img className="img-fluid" alt="cover" src={this.state.coverUrl} />
          )}
        </div>
        <div className="text-white p-1 bookDisplayContent">
          <h3>{this.props.currentBook.title}</h3>
          <h5>Year of publication: {this.props.currentBook.pubYear}</h5>
          <h5>
            Average Goodreads rating: {this.props.currentBook.averageRating}
          </h5>
          <div className="text-justify">{this.props.currentBook.description}</div>
        </div>
      </div>
    );
  }
}

export default BookDisplayCard;
