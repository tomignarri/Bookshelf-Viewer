import React from 'react';
import '../styles/style.css';


class BookCard extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    showBookDisplay = (index) => {
        this.props.bookSelected(index);
    };
  
    render(){
        return (
           <div 
             className="col-6 col-sm-6 col-md-4 col-lg-3 text-center py-3 my-2 bookCard"
             onClick={() => this.showBookDisplay(this.props.index)}>
              <div className="box">  
                <img alt="missing cover" src={this.props.book.cover} />
              </div>  
           </div>
        );
    }
}





export default BookCard;