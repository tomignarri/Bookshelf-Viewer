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
                <form onSubmit={this.onFormSubmit}>
                    <div>
                        <label>Search User</label>
                        <input type="text" value={this.state.term} onChange={(e) => this.setState({ term: e.target.value })}></input>
                        <input type="submit" value="Submit"></input>
                    </div>
                </form>
            </div>
        );    
    };

}





export default UserSearch;