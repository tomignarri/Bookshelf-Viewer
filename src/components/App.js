import React from 'react';
import goodreads from '../api/goodreads';
import BookList from './BookList';
import UserSearch from './UserSearch';


class App extends React.Component {
    state = { books: [] }

    onSearchSubmit = async (term) => {
        const response = await goodreads.get('review/list?v=2', {
            params: { 
                id: term,
                key: '3sZmRXu71xYxamuJhPxCg'
            }
        });

        console.log(response);
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