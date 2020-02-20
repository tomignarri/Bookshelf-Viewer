import React from "react";
import LoadingIcon from "./LoadingIcon";

class BookDisplayCard extends React.Component {
  state = {
    coverUrl: "",
    loadingCover: false
  };

  fetchImage = async () => {
    this.setState({ loadingCover: true });
    try {
      var coverUrl =
        (await "http://covers.openlibrary.org/b/isbn/") +
        this.props.currentBook.isbn +
        "-L.jpg";
      this.chooseImage(coverUrl);
    } catch (error) {
      this.setState({ loadingCover: false });
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
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
        // The request was made but no response was received.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an error.
        console.log("Error", error.message);
      }
      console.log(error.config);
      alert("Image could not be found.");
    }
  };

  chooseImage = async coverUrl => {
    let getSize = new Promise((resolve, reject) => {
      var img = new Image();
      img.addEventListener("load", function() {
        if (this.naturalWidth > 1) {
          resolve(true);
        }
        resolve(false);
      });
      img.src = coverUrl;
    });

    let coverAvailable = await getSize;

    if (coverAvailable) {
      this.setState({ coverUrl: coverUrl, loadingCover: false });
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

  componentDidUpdate(prevProps) {
    if (this.props.currentBook !== prevProps.currentBook) {
      // this.setState({ coverUrl: this.props.currentBook.cover });
      this.fetchImage();
    }
  }

  render() {
    // if chosen book in not null, use
    //id from bookcard to decide which book to display

    return (
      <div className="row">
        <div className="col-12 col-sm-12 col-m-5 col-lg-5 text-white text-center">
          {this.state.loadingCover ? (
            <LoadingIcon />
          ) : (
            <img alt="cover" src={this.state.coverUrl}></img>
          )}
        </div>
        <div className="col-12 col-sm-12 col-m-7 col-lg-7 text-white">
          <h3>{this.props.currentBook.title}</h3>
          <h5>{this.props.currentBook.pubYear}</h5>
          <div>{this.props.currentBook.description}</div>
        </div>
      </div>
    );
  }
}

export default BookDisplayCard;
