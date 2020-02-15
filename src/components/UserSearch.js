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
                <nav className="navbar navbar-light bg-light">
                  <form onSubmit={this.onFormSubmit} className="form-inline">
                      <div>
                        <input type="text" 
                          value={this.state.term} 
                          onChange={(e) => this.setState({ term: e.target.value })} 
                          className="form-control"
                          placeholder="Search Author" required></input>
                      </div>
                      <div>
                        <input 
                          type="submit" 
                          value="Submit" 
                          className="btn btn-outline-success">
                        </input>
                        </div>
                  </form>
                </nav>
                               
                    
            </div>
        );    
    };

}





export default UserSearch;