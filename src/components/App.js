import React from 'react';
import goodreads from '../api/goodreads';
import BookList from './BookList';
import UserSearch from './UserSearch';
var convert = require('xml-js');


class App extends React.Component {
    state = { books: [] };


    onSearchSubmit = async (term) => {
        const response = await goodreads.get('review/list?v=2', {
            params: { 
                id: term,
                key: '3sZmRXu71xYxamuJhPxCg'
            }
        });

        var xml = response.data;
        var result = convert.xml2json(xml, {compact: true, spaces: 4});
        
        result = JSON.parse(result);
        var bookArr = result.GoodreadsResponse.reviews.review
        console.log(bookArr);

        var bookSet = [];

        for(var i = 0;i < bookArr.length; i++){
            var bookData = new Object();
            bookData.title = result.GoodreadsResponse.reviews.review[i].book.title;
            bookData.cover = result.GoodreadsResponse.reviews.review[i].book.image_url;
            bookData.author = result.GoodreadsResponse.reviews.review[i].book.authors.author.name;
            bookSet.push(bookData);
        }

        console.log(bookSet);

        this.setState({ books: bookSet });
        //console.log(this.state.books);
        
    }

    render(){
        return (
            <div>
                <UserSearch onSubmit={this.onSearchSubmit} />
                <BookList books={this.state.books} />
            </div>    
        );
    };

}





export default App;