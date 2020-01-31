import React from 'react';
import BookList from './BookList';
import UserSearch from './UserSearch';


class App extends React.Component {
    state = { books: [] }

    onSearchSubmit = async term => {
        // const response = await api.get('/search/books', {
        //     params: { query: term },
        // });
    
        // this.setState({ books: response.data.results });
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