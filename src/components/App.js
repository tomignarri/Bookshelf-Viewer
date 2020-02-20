/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React from "react";
import goodreads from "../api/goodreads";
import goodreadsAuthorList from "../api/goodreadsAuthorList";
import UserSearch from "./UserSearch";
import Gallery from "./Gallery";
import LoadingIcon from "./LoadingIcon";

const convert = require("xml-js");
const he = require("he");

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      authorId: "",
      loadingBooks: false,
      authorName: ""
    };
  }

  // Use the user entered search term to fetch the author id from the Goodreads api
  // so that the id can be used in the searchAuthorBooks api call.
  onSearchSubmit = async term => {
    this.setState({ loadingBooks: true });
    try {
      const response = await goodreads.get(`/api/author_url/${term}`, {
        params: {
          key: "3sZmRXu71xYxamuJhPxCg"
        }
      });
      this.parseAuthorIdResponse(response);
    } catch (error) {
      this.setState({ loadingBooks: false });
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status >= 400 && error.response.status < 500) {
          this.setState({ authorName: "Search input not accepted." });
        } else if (
          error.response.status >= 500 &&
          error.response.status < 600
        ) {
          this.setState({ authorName: "Server cannot be accessed." });
        }
        this.setState({ authorName: error.response.statusText });
      } else if (error.request) {
        // The request was made but no response was received.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an error.
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  searchAuthorBooks = async authorId => {
    try {
      const response = await goodreadsAuthorList.get("/author/list.xml", {
        params: {
          id: authorId,
          key: "3sZmRXu71xYxamuJhPxCg",
          page: 1
        }
      });
      this.parseAuthorBooks(response);
    } catch (error) {
      this.setState({ loadingBooks: false });
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status >= 400 && error.response.status < 500) {
          this.setState({ authorName: "Search input not accepted." });
        } else if (
          error.response.status >= 500 &&
          error.response.status < 600
        ) {
          this.setState({ authorName: "Server cannot be accessed." });
        }
        this.setState({ authorName: error.response.statusText });
      } else if (error.request) {
        // The request was made but no response was received.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an error.
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  // Remove html tags from descriptions.
  removeHtmlTags = description => {
    const strippedHtml = description.replace(/<[^>]+>/g, "");

    // This he.decode function and translate any named and numerical character references.
    const decodedStrippedHtml = he.decode(strippedHtml);
    return decodedStrippedHtml;
  };

  parseAuthorBooks(response) {
    const xml = response.data;
    let result = convert.xml2json(xml, { compact: true, spaces: 4 });

    result = JSON.parse(result);
    console.log(result);

    // eslint-disable-next-line no-underscore-dangle
    this.setState({ authorName: result.GoodreadsResponse.author.name._text });

    const bookSearchArr = result.GoodreadsResponse.author.books.book;
    console.log(bookSearchArr);

    const bookSet = [];

    for (let i = 0; i < bookSearchArr.length; i += 1) {
      // Only adds the book to the set if it has a description.
      if (
        typeof bookSearchArr[i].description._text === "string" ||
        bookSearchArr[i].description._text instanceof String
      ) {
        const bookData = {};
        bookData.id = bookSearchArr[i].id._text;
        bookData.title = bookSearchArr[i].title._text;
        bookData.cover = bookSearchArr[i].image_url._text;
        bookData.pubYear = bookSearchArr[i].publication_year._text;
        bookData.averageRating = bookSearchArr[i].average_rating._text;
        bookData.description = this.removeHtmlTags(
          bookSearchArr[i].description._text
        );
        bookData.isbn = bookSearchArr[i].isbn._text;
        bookSet.push(bookData);
      }
    }

    this.setState({ books: bookSet, loadingBooks: false });
    console.log(this.state.books);
  }

  parseAuthorIdResponse(response) {
    const xml = response.data;
    let result = convert.xml2json(xml, { compact: true, spaces: 4 });

    result = JSON.parse(result);

    if (typeof result.GoodreadsResponse.author !== "undefined") {
      this.setState({
        // eslint-disable-next-line no-underscore-dangle
        authorId: result.GoodreadsResponse.author._attributes.id
      });
    } else {
      this.setState({ authorName: "author not found", loadingBooks: false });
      return;
    }
    this.searchAuthorBooks(this.state.authorId);
  }

  render() {
    return (
      <div>
        <UserSearch onSubmit={this.onSearchSubmit} />
        <div className="container-fluid">
          <div className="row justify-content-center mt-4 mb-3">
            <h4 className="border-bottom">{this.state.authorName}</h4>
          </div>

          {/* send books */}
          {this.state.loadingBooks ? (
            <LoadingIcon />
          ) : (
            <Gallery books={this.state.books} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
