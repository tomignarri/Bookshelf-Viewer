import React from 'react';


class UserSearch extends React.Component {

    onFormSubmit = (event) => {
        event.preventDefault();
    
        this.props.onSubmit(this.state.term);
    }

    render(){
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>

                </form>
            </div>
        );    
    };

}





export default UserSearch;