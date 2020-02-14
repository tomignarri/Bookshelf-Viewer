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
  }

  renderBookDisplay(){
    if(this.state.createDisplay){
      return (
        <div>
          <button 
            type='button' 
            className='btn btn-dark'
            onClick={this.closeBookDisplay}>
            close
          </button>
          <BookDisplay 
            selectedBookIndex={this.state.bookIndex} 
            allBooks={this.props.books}></BookDisplay>
        </div>
      )
    }
    return <div></div>
  };

  closeBookDisplay = event => {
    event.preventDefault();
    this.setState({ createDisplay: false }); 
  };

  
  render(){
    const books = this.props.books.map((book, index) => {
              return (
                <BookCard key={book.id} book={book} bookSelected={this.bookSelected} index={index} />
              );
          });
      
          return(
            <div>
                {this.renderBookDisplay()}
      
                <div className="row">{books}</div>   
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