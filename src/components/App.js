import React from 'react';
import goodreads from '../api/goodreads';
import BookList from './BookList';
import UserSearch from './UserSearch';


class App extends React.Component {
    state = { books: [] }

    onSearchSubmit = async term => {
        const response = await goodreads.get('/owned_books/user?format=xml', {
            params: { id: term }
        });
    
        this.setState({ books: response.data.results });
    }

    render(){
        return (
            <div>
                <UserSearch onSubmit={this.onSearchSubmit} />
                <BookList />
            </div>    
        );
    };

}





export default App;