import React from 'react';
import BookCard from './BookCard';
import BookDisplayCard from './BookDisplayCard';


class BookDisplay extends React.Component {
    state = {
      selectedBookIndex: this.props.selectedBookIndex
    };


    scrollDisplayBook(newIndex){
      const bookAmount = this.props.allBooks.length
      if(newIndex < 0){
        newIndex = bookAmount - 1;
      } else if(newIndex === bookAmount){
        newIndex = 0;
      }
      this.setState({ selectedBookIndex: newIndex })
    };

    


    render(){
            return (
              <div className="container-fluid border border-warning h-75">
                <div className="row">
                  <div className="col-xs-1 col-sm-1 col-md-2">
                    {/* render previous book */}
                    <button 
                        type='button' 
                        className='btn btn-dark'
                        onClick={() => this.scrollDisplayBook(this.state.selectedBookIndex - 1)}>
                        Previous
                      </button>
                  </div>
  
                  {/* sendData to bookdisplaycard   currentIndex*/}
                  <BookDisplayCard 
                    currentIndex={this.state.selectedBookIndex} 
                    currentBook={this.props.allBooks[this.state.selectedBookIndex]} /> 
                  <div className="col-xs-1 col-sm-1 col-md-2">
                      {/* render next book */}
                      <button 
                        type='button' 
                        className='btn btn-dark'
                        onClick={() => this.scrollDisplayBook(this.state.selectedBookIndex + 1)}>
                        Next
                      </button>
                  </div>
                </div>
              </div>
            ); 
    }
}


export default BookDisplay;