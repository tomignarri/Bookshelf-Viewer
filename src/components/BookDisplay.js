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
              <div className='d-flex flex-column'>
                <div className="d-flex flex-row align-items-center justify-content-center">
                    <button 
                      type='button' 
                      className='btn btn-outline-light'
                      onClick={() => this.scrollDisplayBook(this.state.selectedBookIndex - 1)}>
                      <i className="fas fa-angle-double-left"></i>
                    </button>
                    <button 
                      type='button' 
                      className='btn btn-outline-light'
                      onClick={() => this.scrollDisplayBook(this.state.selectedBookIndex + 1)}>
                      <i className="fas fa-angle-double-right"></i>
                    </button>
                  </div>
                  <div className='container-fluid p-5'>
                      {/* send data to bookdisplaycard*/}
                      <BookDisplayCard 
                        currentIndex={this.state.selectedBookIndex} 
                        currentBook={this.props.allBooks[this.state.selectedBookIndex]} /> 
                      {/* render next book */}
                  </div>
                </div>
           
            ); 
    }
}


export default BookDisplay;