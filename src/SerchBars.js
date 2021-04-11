import React from 'react';

class SerchBars extends React.Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleButtonAction = this.handleButtonAction.bind(this);
  }

  handleTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleButtonAction(e) {
    this.props.onButtonAction(e);
  }

  render() {
    return (
      <nav class="col-12 navbar navbar-light bg-light rounded mb-2">
        <form className="col-12">
          <div class="row justify-content-between">

            <input
              className="col-7 m-2 form-control mr-sm-2"
              type="text"
              placeholder="Search"
              value={this.props.filterText.trim().toLowerCase().replace(/[^\w|-]/, '')}
              onChange={this.handleTextChange}
            />
            <button
              className="col-3 m-2 btn btn-outline-success"
              type="button"
              onChange={this.handleButtonAction}
            >Search</button>
          </div>
        </form>
      </nav>
    );
  }
}


export default SerchBars;