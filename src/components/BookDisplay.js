import React from 'react';
import BookCard from './BookCard';


class BookDisplay extends React.Component {
    // constructor(props){
    //     super(props);
    // }
  

    render(){
        
        // if chosen book in not null, use 
        //id from bookcard to decide which book to display
        // if(true){
        //     return <BookCard />
        // } 
        
        return (
            <div className='col-12'>
                {this.props.selectedBook.title}
                <img alt="cover" src={this.props.selectedBook.cover}></img>
            </div>
        ); 

    }
}


export default BookDisplay;