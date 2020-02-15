import React from 'react';
import goodreads from '../api/goodreads';
import openLibrary from '../api/openlibrary'
var convert = require('xml-js');





class BookDisplayCard extends React.Component {
    state = {
        description: '',
        coverUrl: '',
        isbn: ''
       
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
        
            this.setState({ description: bookInfo.description._cdata, isbn: bookInfo.isbn._cdata }); 
            console.log(bookInfo);  
            this.fetchImage();
    };  
    
    // fetchImage = async (isbn) => {
    //     const response = await openLibrary.get('/$value-$size.jpg', {
    //         params: {
    //             value: isbn,
    //             size: 'L'
    //         }
    //     });

    //     console.log(response);

    //     //this.setState({ coverUrl: response });
    // }
    fetchImage() {
        var coverUrl = 'http://covers.openlibrary.org/b/isbn/' + this.state.isbn + '-L.jpg';
        this.setState({ coverUrl: coverUrl });
        console.log(this.state);
    }
    
    

    componentDidMount(){
      this.fetchInfo();
      
    //   this.fetchImage(this.state.isbn);
    }
    
    componentDidUpdate(prevProps){
      if(this.props.currentBook !== prevProps.currentBook){
        this.fetchInfo();
      }
    }
    
    displayPresentImage(){
        if(this.state.isbn === undefined){
          return <img alt="cover" src={this.props.currentBook.cover}></img>;
        }
        return <img alt="cover" src={this.state.coverUrl}></img>;
    }


    
    render(){
        // if chosen book in not null, use 
        //id from bookcard to decide which book to display
  
            return (
                <div className='d-flex align-items-center text-white text-center flex-column'>
                    {this.props.currentBook.title}
                    {this.displayPresentImage()}
                    {this.props.currentBook.pubYear}

                    {this.state.description}

                    
                </div>
            );
    };
}


export default BookDisplayCard;