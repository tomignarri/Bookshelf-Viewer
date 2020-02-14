import React from 'react';




class BookDisplayCard extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    render(){


        
        // if chosen book in not null, use 
        //id from bookcard to decide which book to display
  
            return (
                <div className='d-flex align-items-center text-white text-center flex-column'>
                    {this.props.currentBook.title}
                    <img alt="cover" src={this.props.currentBook.cover}></img>
                    {this.props.currentBook.pubYear}
                </div>
            );
    };
}


export default BookDisplayCard;