import React from 'react';
import goodreads from '../api/goodreads';
var convert = require('xml-js');
var he = require('he');





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
            
        
            this.setState({ 
                description: this.removeHtmlTags(bookInfo.description._cdata), 
                isbn: bookInfo.isbn._cdata 
            });   
            this.fetchImage();
    };  

    // The descriptions are full of html tags.
    removeHtmlTags(description){
        var stripedHtml = description.replace(/<[^>]+>/g, '');
        var decodedStripedHtml = he.decode(stripedHtml);
        return decodedStripedHtml;
    }
    

    fetchImage() {
        var coverUrl = 'http://covers.openlibrary.org/b/isbn/' + this.state.isbn + '-L.jpg';
        this.setState({ coverUrl: coverUrl });
        
        
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
    
    // Display the goodreads thumbnail if an open library image is not available.
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
              <div className='row'>
                <div className='col-12 col-sm-12 col-m-5 col-lg-5 text-white text-center'>
                    {this.displayPresentImage()}
                </div>  
                <div className='col-12 col-sm-12 col-m-7 col-lg-7 text-white'>
                  <h3>{this.props.currentBook.title}</h3>
                  <h5>{this.props.currentBook.pubYear}</h5>
                  <div>{this.state.description}</div>
                </div>  
              </div>
            );
    };
}


export default BookDisplayCard;