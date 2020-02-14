import React from 'react';




class BookDisplayCard extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    render(){


        
        // if chosen book in not null, use 
        //id from bookcard to decide which book to display
  
            return (
                <div className='col-xs-10 col-sm-10 col-md-8 text-center border'>
                    {/* {this.state.books[0].title} */}
                    card here
                    {this.props.currentBook.title}
                    {/* <img alt="cover" src={this.props.allBooks.cover}></img> */}
                </div>
            );
    };
}


export default BookDisplayCard;