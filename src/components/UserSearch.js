import React from 'react';


class UserSearch extends React.Component {
    state = { term: '' };

    onFormSubmit = (event) => {
        event.preventDefault();
    
        this.props.onSubmit(this.state.term);
    }

    render(){
        return (
            <div>
                <nav className="navbar navbar-light bg-dark justify-content-between">
                <span class="navbar-text text-white">
                  Bookshelf Viewer
                </span>
                  <form onSubmit={this.onFormSubmit} className="form-inline">
                      
                      <div>
                        <input type="text" 
                          value={this.state.term} 
                          onChange={(e) => this.setState({ term: e.target.value })} 
                          className="form-control form-control-sm"
                          placeholder="Search Author" required></input>
                      </div>
                      <div>
                        <input 
                          type="submit" 
                          value="Submit" 
                          className="btn btn-light btn-sm ml-2">
                        </input>
                      </div>
                  </form>
                </nav>
                               
                    
            </div>
        );    
    };

}





export default UserSearch;