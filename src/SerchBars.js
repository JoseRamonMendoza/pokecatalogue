import React from 'react';

class SerchBars extends React.Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmitAction = this.handleSubmitAction.bind(this);
  }

  handleTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleSubmitAction(e) {
    e.preventDefault();
    this.props.onSearchAction(e);
  }

  render() {
    return (
      <nav className="col-12 navbar navbar-light bg-light rounded mb-2">
        <form 
          className="col-12"
          onSubmit={this.handleSubmitAction}
        >
          <div className="row justify-content-between">

            <input
              className="col-7 m-2 form-control mr-sm-2"
              type="text"
              placeholder="Search"
              value={String(this.props.filterText).trim().toLowerCase().replace(/[^\w|-]/, '')}
              onChange={this.handleTextChange}
            />
            <button
              className="col-3 m-2 btn btn-outline-success"
              type="submit"
            >Search</button>
          </div>
        </form>
      </nav>
    );
  }
}


export default SerchBars;