import React from 'react';
import goodreads from '../api/goodreads';
var convert = require('xml-js');





class BookDisplayCard extends React.Component {
    state = {
        description: ''
       
    };

    fetchInfo = async () => {
        const response = await goodreads.get('/book/title.xml', {
                    params: { 
                        key: '3sZmRXu71xYxamuJhPxCg',
                        title: this.props.currentBook.title
                    }  
                });
        
            var xml = response.data;
            var result = convert.xml2json(xml, {compact: true, spaces: 4});
        
            result = JSON.parse(result);
        
            var bookInfo = result.GoodreadsResponse.book;
        
          
            this.setState({ description: bookInfo.description._cdata });   
    };   
    
    

    componentDidMount(){
      this.fetchInfo();
    }
    
    componentDidUpdate(prevProps){
      if(this.props.currentBook !== prevProps.currentBook){
        this.fetchInfo();
      }
    }
         


    
    render(){


        
        // if chosen book in not null, use 
        //id from bookcard to decide which book to display
  
            return (
                <div className='d-flex align-items-center text-white text-center flex-column'>
                    {this.props.currentBook.title}
                    <img alt="cover" src={this.props.currentBook.cover}></img>
                    {this.props.currentBook.pubYear}

                    {this.state.description}
                    
                </div>
            );
    };
}


export default BookDisplayCard;