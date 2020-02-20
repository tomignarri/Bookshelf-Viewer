import React from "react";

class UserSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = { term: "" };
  }

  // Receive input from form input and send to App component.
  onFormSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.term);
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-light bg-dark justify-content-between">
          <span className="navbar-text text-white">Bookshelf Viewer</span>
          <form onSubmit={this.onFormSubmit} className="form-inline">
            <div>
              <input
                type="text"
                value={this.state.term}
                onChange={e => this.setState({ term: e.target.value })}
                className="form-control form-control-sm"
                placeholder="Search Author"
                required
              />
            </div>
            <div>
              <input
                type="submit"
                value="Submit"
                className="btn btn-light btn-sm ml-2"
              />
            </div>
          </form>
        </nav>
      </div>
    );
  }
}

export default UserSearch;
