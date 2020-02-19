import React from 'react';
import LoadingIcon from './LoadingIcon';
import goodreads from '../api/goodreads';
var convert = require('xml-js');





class BookDisplayCard extends React.Component {
    state = {
        coverUrl: '',
        loadingCover: false 
    };
 

    fetchImage = async () => {
        this.setState({ loadingCover: true })
        var coverUrl = await 'http://covers.openlibrary.org/b/isbn/' + this.props.currentBook.isbn + '-L.jpg';
        
        console.log(coverUrl);

        let getSize = new Promise((resolve, reject)=>{
          
          var img = new Image();
          img.addEventListener("load", function(){
              if(this.naturalWidth > 1){
                console.log("true");
                resolve(true);
              } 
              resolve(false);
          });
          img.src = coverUrl;
          
        });

        let coverAvailable = await getSize;
          
        if(coverAvailable){
          this.setState({ coverUrl: coverUrl, loadingCover: false });
        } else if(!coverAvailable){
          this.setState({ coverUrl: this.props.currentBook.cover, loadingCover: false });
        }
    }
    
    
    componentDidMount(){
      this.fetchImage();
    }

    
    componentDidUpdate(prevProps){
      if(this.props.currentBook !== prevProps.currentBook){
        // this.setState({ coverUrl: this.props.currentBook.cover });
        this.fetchImage();
      }
    }


    
    // Read response image size.
    getMeta(url){   
          var img = new Image();
          img.addEventListener("load", function(){
              if(this.naturalWidth > 1){
                console.log("true");
                return true;

              } 
              return false;
              
          });
          img.src = url;
    }
    

    
    render(){
        // if chosen book in not null, use 
        //id from bookcard to decide which book to display
  
            return (
              <div className='row'>
                <div className='col-12 col-sm-12 col-m-5 col-lg-5 text-white text-center'>
                {this.state.loadingCover ? <LoadingIcon /> : <img alt="cover" src={this.state.coverUrl}></img>}
                    
                    
                </div>  
                <div className='col-12 col-sm-12 col-m-7 col-lg-7 text-white'>
                  <h3>{this.props.currentBook.title}</h3>
                  <h5>{this.props.currentBook.pubYear}</h5>
                  <div>{this.props.currentBook.description}</div>
                </div>  
              </div>
            );
    };
}


export default BookDisplayCard;