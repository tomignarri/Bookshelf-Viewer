import React from 'react';
import goodreads from '../api/goodreads';
import goodreadsAuthorList from '../api/goodreadsAuthorList';
import UserSearch from './UserSearch';
import Gallery from './Gallery';
import LoadingIcon from './LoadingIcon';
var convert = require('xml-js');
var he = require('he');


class App extends React.Component {
    state = { 
        books: [],
        authorId: '',
        loadingBooks: false 
    };
  
    // Use the user entered search term to fetch the author id from the Goodreads api
    // so that the id can be used in the searchAuthorBooks api call.
    onSearchSubmit = async (term) => {
        this.setState({ loadingBooks: true });
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
            
            // Only adds the book to the set if it has a description.
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
              bookData.isbn = bookSearchArr[i].isbn._text;
              bookSet.push(bookData);
            }
        }
       
        this.setState({ books: bookSet, loadingBooks: false });
        console.log(this.state.books);
        
    }

    // Remove html tags from descriptions.
    removeHtmlTags(description){
        var strippedHtml = description.replace(/<[^>]+>/g, '');

        // This he.decode function and translate any named and numerical character references.
        var decodedStrippedHtml = he.decode(strippedHtml);
        return decodedStrippedHtml;
    }

    render(){
        return (
            <div>
                <UserSearch onSubmit={this.onSearchSubmit} />
                <div className="container-fluid">

                  {/* send books */}
                  {this.state.loadingBooks ? <LoadingIcon /> : <Gallery books={this.state.books} />}
                  
                </div>
            </div>    
        );
    };
}


export default App;