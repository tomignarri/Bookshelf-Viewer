import React from 'react';
import BookCard from './BookCard';
import BookDisplay from './BookDisplay';
import '../styles/style.css';


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
        <div className='d-flex flex-column fixed-top h-100 bg'>
          <div className='d-flex flex-column text-white text-center align-items-center justify-content-center'>
              {this.props.books[0].author}
              <button 
              type='button' 
              className='btn btn-outline-light'
              onClick={this.closeBookDisplay}>
              close
              </button>
          </div>
          
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