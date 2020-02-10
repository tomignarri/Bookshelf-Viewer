import React from 'react';


class BookCard extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    render(){
        return (
           <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 text-center border">
               <div>{this.props.book.title}</div>
               <img alt="missing cover" src={this.props.book.cover} />
               <div>{this.props.book.author}</div>
           </div>
        );
    }
}





export default BookCard;