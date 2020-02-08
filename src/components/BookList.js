import React from 'react';
import BookCard from './BookCard';


const BookList = (props) => {
    const books = props.books.map((book) => {
        return <BookCard key={book.id} book={book} />
    });

    return <div>{books}</div>
};


export default BookList;