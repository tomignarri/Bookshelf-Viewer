import React from 'react';
import goodreads from '../api/goodreads';
import ReviewFinder from './ReviewFinder';





class BookDisplayCard extends React.Component {


    onSearchReviews = async (bookInfo) => {
        const response = await goodreads.get('/book/title.json', {
            params: { 
                key: '3sZmRXu71xYxamuJhPxCg',
                title: bookInfo
            }  
        });

        console.log(response.data);
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
                </div>
            );
    };
}


export default BookDisplayCard;