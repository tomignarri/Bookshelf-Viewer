import React from 'react';
import BookList from './BookList';
import BookCard from './BookCard';
import BookDisplay from './BookDisplay';


class Gallery extends React.Component {
  state = {
      bookId: ''
  };

  bookSelected = id => {
    this.setState({bookId: id}); 
    console.log(this.state.bookId);       
  }
  
  render(){
    const books = this.props.books.map((book) => {
              return (
                <BookCard key={book.id} book={book} bookSelected={this.bookSelected} />
              );
          });
      
          return(
            <div className="row">{books}
            <BookDisplay selectedBook={this.state.bookId}></BookDisplay>
            </div>
          ); 
  };
}







// const Gallery = (props) => {
    
  
//   // this.setState = {
//     //   bookId: ''
//     // };


//     const books = props.books.map((book) => {
//         return (
//           <BookCard key={book.id} book={book} />
//         );
//     });


//     const bookSelected = id => {
//         console.log("hello");  
//         // this.setState({bookId: id});       
//     }
    
//     return(
//       <div className="row">{books}
//       <BookDisplay displaySelectedBook={this.bookSelected}></BookDisplay>
//       </div>
//     ); 




// };



export default Gallery;