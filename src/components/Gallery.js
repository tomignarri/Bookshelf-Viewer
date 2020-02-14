import React from 'react';
import BookList from './BookList';
import BookCard from './BookCard';
import BookDisplay from './BookDisplay';


class Gallery extends React.Component {
  state = {
    bookIndex: 0,
    createDisplay: false 
  };


  //gallery sends all books to display
  //book card sends book index
  bookSelected = bookIndex => {
    this.setState({bookIndex: bookIndex, createDisplay: true}); 
    //console.log(this.state.bookIndex);       
  }
  
  render(){
    const books = this.props.books.map((book, index) => {
              return (
                <BookCard key={book.id} book={book} bookSelected={this.bookSelected} index={index} />
              );
          });
      
          return(
            <div className="row">{books}
            <BookDisplay 
              selectedBookIndex={this.state.bookIndex} 
              allBooks={this.props.books}
              createDisplay={this.state.createDisplay}></BookDisplay>
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