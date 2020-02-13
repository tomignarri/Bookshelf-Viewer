import React from 'react';
import BookDisplay from './BookDisplay';


class BookCard extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    showBookId = (id) => {
        this.props.bookSelected(id);
    };

    render(){
        return (
           <div 
             className="col-xs-12 col-sm-6 col-md-4 col-lg-3 text-center border"
             onClick={() => this.showBookId(this.props.book.id)}>
               <div>{this.props.book.title}</div>
               <img alt="missing cover" src={this.props.book.cover} />
           </div>
        );
    }
}





export default BookCard;