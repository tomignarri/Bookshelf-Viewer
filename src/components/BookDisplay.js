import React from 'react';
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
                <div className="d-flex flex-row align-items-center justify-content-between">
                    <button 
                      type='button' 
                      className='btn btn-outline-light'
                      onClick={() => this.scrollDisplayBook(this.state.selectedBookIndex - 1)}>
                      Previous
                    </button>
  
                      {/* send data to bookdisplaycard*/}
                      <BookDisplayCard 
                        currentIndex={this.state.selectedBookIndex} 
                        currentBook={this.props.allBooks[this.state.selectedBookIndex]} /> 
                      {/* render next book */}
                    <button 
                      type='button' 
                      className='btn btn-outline-light'
                      onClick={() => this.scrollDisplayBook(this.state.selectedBookIndex + 1)}>
                      Next
                    </button>
                </div>
           
            ); 
    }
}


export default BookDisplay;