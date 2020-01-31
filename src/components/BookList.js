import React from 'react';
import BookCard from './BookCard';


const BookList = (props) => {
    const books = props.books.map((book) => {
        return <BookCard />
    });

    return <div>{books}</div>
};


export default BookList;