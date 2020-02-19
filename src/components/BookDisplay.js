import React from 'react';
import BookDisplayCard from './BookDisplayCard';




class BookDisplay extends React.Component {
    state = {
      selectedBookIndex: this.props.selectedBookIndex,
      touchStartX: 0,
      touchCurrentX: 0,
      swipeThreshold: 75
    };


    scrollDisplayBook(newIndex){
      const bookAmount = this.props.allBooks.length
      if(newIndex < 0){
        newIndex = bookAmount - 1;
      } else if(newIndex === bookAmount){
        newIndex = 0;
      }
      this.setState({ 
        selectedBookIndex: newIndex,
      });
    };

    touchStart = event => {
      const touchObj = event.touches[0];
      this.setState({
        touchStartX: touchObj.clientX,
        touchCurrentX: touchObj.clientX
      })
      //console.log('start   ' + this.state.touchStartX);
    };

    touchMove = event => {
      const touchObj = event.touches[0];
      this.setState({
        touchCurrentX: touchObj.clientX,
      })
      
    };

    touchEnd = () => {
      //var s = { touchStarted: false };
     
      console.log('start   ' + this.state.touchStartX);
      console.log('end   ' + this.state.touchCurrentX);
  
      if (Math.abs(this.state.touchStartX - this.state.touchCurrentX) > this.state.swipeThreshold) 
      {
          var swipeDirection = this.state.touchStartX > this.state.touchCurrentX ? 1 : -1;
          this.scrollDisplayBook(this.state.selectedBookIndex + swipeDirection);
      }

    };

    
    render(){
            return (
              <div 
                className='d-flex flex-column' 
                onTouchStart={this.touchStart}
                onTouchMove={this.touchMove}
                onTouchEnd={this.touchEnd}>
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