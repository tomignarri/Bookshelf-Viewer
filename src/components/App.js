import React from 'react';
import goodreads from '../api/goodreads';
import BookList from './BookList';
import UserSearch from './UserSearch';
var convert = require('xml-js');


class App extends React.Component {
    state = { books: [] }

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
        console.log(result);
        //this.setState({ books: response.data.results });
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