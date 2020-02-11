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
                  {/* <a className="navbar-brand">Navbar</a> */}
                  <form onSubmit={this.onFormSubmit} className="form-inline">
                        <label>Search User</label>
                        <input type="text" 
                          value={this.state.term} 
                          onChange={(e) => this.setState({ term: e.target.value })} 
                          className="form-control mr-sm-2"></input>
                        <input type="submit" value="Submit" className="btn btn-outline-success my-2 my-sm-0"></input>
                  </form>
                </nav>
                               
                    
            </div>
        );    
    };

}





export default UserSearch;