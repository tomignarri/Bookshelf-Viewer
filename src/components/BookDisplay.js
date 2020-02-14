import React from 'react';
import BookCard from './BookCard';
import ScrollButton from './ScrollButton';
import BookDisplayCard from './BookDisplayCard';


class BookDisplay extends React.Component {
    // constructor(props){
    //     super(props);
    // }
    state = {
      selectedBookIndex: this.props.selectedBookIndex
    };




    render(){
        // if chosen book in not null, use 
        //id from bookcard to decide which book to display
     
            return (
              <div className="row">
                <div className="col-2">
                  {/* render previous book */}
                  <button 
                      type='button' 
                      className='btn btn-dark'
                      onClick={() => this.setState({ selectedBookIndex: this.state.selectedBookIndex - 1 })}>
                      click
                    </button>
                </div>

                {/* sendData to bookdisplaycard   currentIndex*/}
                <BookDisplayCard 
                  currentIndex={this.state.selectedBookIndex} 
                  currentBook={this.props.allBooks[this.state.selectedBookIndex]} /> 
                <div className="col-2">
                    {/* render next book */}
                    <button 
                      type='button' 
                      className='btn btn-dark'
                      onClick={() => this.setState({ selectedBookIndex: this.state.selectedBookIndex + 1 })}>
                      click
                    </button>
                </div>
              </div>
            ); 
    }
}


export default BookDisplay;