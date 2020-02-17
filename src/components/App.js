import React from 'react';
import goodreads from '../api/goodreads';
import goodreadsAuthorList from '../api/goodreadsAuthorList';
import UserSearch from './UserSearch';
import Gallery from './Gallery';
var convert = require('xml-js');
var he = require('he');


class App extends React.Component {
    state = { 
        books: [],
        authorId: '' 
    };



    // onSearchSubmit = async (term) => {
    //     const response = await goodreads.get('/search/index.xml', {
    //         params: { 
    //             q: term,
    //             key: '3sZmRXu71xYxamuJhPxCg',
    //             'search[field]': 'author',
    //         }  
    //     });

    //     var xml = response.data;
    //     var result = convert.xml2json(xml, {compact: true, spaces: 4});
        
    //     result = JSON.parse(result);
    //     var bookSearchArr = result.GoodreadsResponse.search.results.work
    //     console.log(bookSearchArr);

    //     var bookSet = [];

    //     for(var i = 0;i < bookSearchArr.length; i++){
    //         var bookData = new Object();
    //         bookData.id = bookSearchArr[i].best_book.id._text;
    //         bookData.title = bookSearchArr[i].best_book.title._text;;
    //         bookData.cover = bookSearchArr[i].best_book.image_url._text;
    //         bookData.author = bookSearchArr[i].best_book.author.name._text;
    //         bookData.pubYear = bookSearchArr[i].original_publication_year._text;
    //         bookSet.push(bookData);
    //     }
       
    //     this.setState({ books: bookSet });
    //     console.log(this.state.books);
        
    // }

    onSearchSubmit = async (term) => {
        const response = await goodreads.get(`/api/author_url/${term}`, {
            params: { 
                key: '3sZmRXu71xYxamuJhPxCg'
            }  
        });

        var xml = response.data;
        var result = convert.xml2json(xml, {compact: true, spaces: 4});
        
        result = JSON.parse(result);

        console.log(result.GoodreadsResponse.author._attributes.id);


        this.setState({ 
            authorId: result.GoodreadsResponse.author._attributes.id 
        });

        this.searchAuthorBooks(this.state.authorId);
        
    }


    searchAuthorBooks = async (authorId) => {
        const response = await goodreadsAuthorList.get('/author/list.xml', {
            params: { 
                id: authorId,
                key: '3sZmRXu71xYxamuJhPxCg',
                page: 1
            }  
        });

        var xml = response.data;
        var result = convert.xml2json(xml, {compact: true, spaces: 4});
        
        result = JSON.parse(result);
        console.log(result);

        var bookSearchArr = result.GoodreadsResponse.author.books.book
        console.log(bookSearchArr);

        var bookSet = [];

        for(var i = 0;i < bookSearchArr.length; i++){
            
            // This only adds the book to the set if it has a description.
            if(
                typeof bookSearchArr[i].description._text === 'string' 
                || bookSearchArr[i].description._text instanceof String
            ){
              var bookData = new Object();
              bookData.id = bookSearchArr[i].id._text;
              bookData.title = bookSearchArr[i].title._text;
              bookData.cover = bookSearchArr[i].image_url._text;
              bookData.pubYear = bookSearchArr[i].publication_year._text;
              bookData.averageRating = bookSearchArr[i].average_rating._text;
              bookData.description = this.removeHtmlTags(bookSearchArr[i].description._text);
            //   bookData.description = bookSearchArr[i].description._text;
              bookData.isbn = bookSearchArr[i].isbn._text;
              bookSet.push(bookData);
            }
        }
       
        this.setState({ books: bookSet });
        console.log(this.state.books);
        
    }

    // Remove html tags from descriptions.
    removeHtmlTags(description){
        var strippedHtml = description.replace(/<[^>]+>/g, '');
        var decodedStrippedHtml = he.decode(strippedHtml);
        return decodedStrippedHtml;
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