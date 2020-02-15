import React from 'react';
import goodreads from '../api/goodreads';
import BookList from './BookList';
import UserSearch from './UserSearch';
import Gallery from './Gallery';
import BookDisplay from './BookDisplay';
var convert = require('xml-js');


class App extends React.Component {
    state = { books: [] };



    onSearchSubmit = async (term) => {
        const response = await goodreads.get('/search/index.xml', {
            params: { 
                q: term,
                key: '3sZmRXu71xYxamuJhPxCg',
                'search[field]': 'author',
            }  
        });

        var xml = response.data;
        var result = convert.xml2json(xml, {compact: true, spaces: 4});
        
        result = JSON.parse(result);
        var bookSearchArr = result.GoodreadsResponse.search.results.work
        console.log(bookSearchArr);

        var bookSet = [];

        for(var i = 0;i < bookSearchArr.length; i++){
            var bookData = new Object();
            bookData.id = bookSearchArr[i].best_book.id._text;
            bookData.title = bookSearchArr[i].best_book.title._text;;
            bookData.cover = bookSearchArr[i].best_book.image_url._text;
            bookData.author = bookSearchArr[i].best_book.author.name._text;
            bookData.pubYear = bookSearchArr[i].original_publication_year._text;
            bookSet.push(bookData);
        }
       
        this.setState({ books: bookSet });
        console.log(this.state.books);
        
    }

    render(){
        return (
            <div>
                <UserSearch onSubmit={this.onSearchSubmit} />
                <div className="container-fluid">
                  {/* <BookList books={this.state.books} /> */}

                  {/* send books */}
                  <Gallery books={this.state.books} />
                </div>
            </div>    
        );
    };
}



export default App;