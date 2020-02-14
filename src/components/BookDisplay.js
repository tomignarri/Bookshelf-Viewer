import React from 'react';
import BookCard from './BookCard';


class BookDisplay extends React.Component {
    // constructor(props){
    //     super(props);
    // }


 
  

    render(){
        
        // if chosen book in not null, use 
        //id from bookcard to decide which book to display
        if(this.props.createDisplay){
            return (
                <div className='col-12'>
                    {/* {this.state.books[0].title} */}
                    {this.props.selectedBookIndex} 
                    and 
                    {this.props.allBooks[this.props.selectedBookIndex].title}
                    {/* <img alt="cover" src={this.props.allBooks.cover}></img> */}
                </div>
            ); 
        } 


        return <div></div>
        
        

    }
}


export default BookDisplay;