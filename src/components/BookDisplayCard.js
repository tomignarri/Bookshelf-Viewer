import React from 'react';
import goodreads from '../api/goodreads';
import ReviewFinder from './ReviewFinder';
import BookInfoCard from './BookInfoCard';
var convert = require('xml-js');





class BookDisplayCard extends React.Component {
    state = {
      bookInfo: {},
      searchDone: false
    };


    onSearchReviews = async (bookInfo) => {
        const response = await goodreads.get('/book/title.xml', {
            params: { 
                key: '3sZmRXu71xYxamuJhPxCg',
                title: bookInfo
            }  
        });


        var xml = response.data;
        var result = convert.xml2json(xml, {compact: true, spaces: 4});

        result = JSON.parse(result);

        bookInfo = result.GoodreadsResponse.book;

        console.log(bookInfo);
        this.setState({ bookInfo: bookInfo, searchDone: true});

        console.log(this.state.bookInfo);


        
    };

    displayBookInfo(){
      if(this.state.searchDone){
        return <BookInfoCard bookInfo={this.state.bookInfo} />
      }
      return <div>space for info here</div>
    };

    



    render(){


        
        // if chosen book in not null, use 
        //id from bookcard to decide which book to display
  
            return (
                <div className='d-flex align-items-center text-white text-center flex-column'>
                    {this.props.currentBook.title}
                    <img alt="cover" src={this.props.currentBook.cover}></img>
                    {this.props.currentBook.pubYear}
                    <ReviewFinder bookTitle={this.props.currentBook.title} onSearch={this.onSearchReviews} />
                    {this.displayBookInfo()}
                </div>
            );
    };
}


export default BookDisplayCard;