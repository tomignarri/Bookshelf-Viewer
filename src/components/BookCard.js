import React from 'react';


class BookCard extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    render(){
        return (
           <div className="col-sm col-md-4">
               <div>{this.props.book.title}</div>
               <img alt="missing cover" src={this.props.book.cover} />
               <div>{this.props.book.author}</div>
           </div>
        );
    }
}





export default BookCard;