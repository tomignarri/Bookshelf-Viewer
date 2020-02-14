import React from 'react';

class ReviewFinder extends React.Component {

    onFormSubmit = (event) => {
        event.preventDefault();
    
        this.props.onSearch(this.props.bookTitle);
    }

    render(){
        return (
            <div>
                  <form onSubmit={this.onFormSubmit} className="form-inline">
                        <label>Search Author</label>
                        <input 
                          type="submit" 
                          value="Submit" 
                          className="btn btn-outline-success my-2 my-sm-0">
                        </input>
                  </form>           
            </div>
        );    
    };

}





export default ReviewFinder;