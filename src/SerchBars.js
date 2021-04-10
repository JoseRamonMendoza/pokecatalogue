import React from 'react';

class SerchBars extends React.Component {
    constructor(props){
        super(props);
        this.handleSherchByName = this.handleSherchByName.bind(this);
        this.handleSherchById = this.handleSherchById.bind(this);
    }

    handleSherchByName(e){

    }

    handleSherchById(e){

    }

        render() {
            return (
              <form>
                <input
                  type="text"
                  placeholder="Search pokemon by name..."
                  value={this.props.filterName}
                  onChange={this.handleSherchByName}
                />
                <p>
                  <input
                    type="number"
                    value={this.props.filterId}
                    min={1}
                    max={1117}
                    placeholder="Serch pokemon by number..."
                    onChange={this.handleSherchById}
                  />
                </p>
              </form>
            );
    }
}


export default SerchBars;