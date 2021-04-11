import React from 'react';

class SerchBars extends React.Component {
    constructor(props){
        super(props);
        this.handleSherchByName = this.handleSherchByName.bind(this);
        this.handleSherchById = this.handleSherchById.bind(this);
    }

    handleSherchByName(e){
      this.props.onFilterNameChange(e.target.value);
    }

    handleSherchById(e){
      this.props.onFilterIdChange(e.target.value);
    }

        render() {
            return (
              <form>
                <input
                  type="text"
                  placeholder="Search by name"
                  value={this.props.filterName}
                  onChange={this.handleSherchByName}
                />
                <p>
                  <input
                    type="number"
                    value={this.props.filterId}
                    min={1}
                    max={10219}
                    placeholder="Serch by ID"
                    onChange={this.handleSherchById}
                  />
                </p>
              </form>
            );
    }
}


export default SerchBars;