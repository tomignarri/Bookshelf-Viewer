import React from 'react';
import BookList from './BookList';
import BookCard from './BookCard';


// class Gallery extends React.Component {
  
  
  
//   render(){
//     return <div className="row">{books}</div>
//   };

  
// }




const Gallery = (props) => {
    const books = props.books.map((book) => {
        return (
          <BookCard key={book.id} book={book} />
        );
    });
    
    return <div className="row">{books}</div>
};



export default Gallery;