import React from 'react';

class GeneralViewPokemon extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.onFilterTextChange(this.props.pokeJson.id);
        setTimeout(() => {this.props.onSearchAction()}, 1);
    }

    render() {
        const pokeJson = this.props.pokeJson;
        const types = pokeJson.types.map(item => " " + item.type.name);
        return (
            <div className="col-12 col-sm-6 col-md-4 col-xl-2 d-flex justify-content-center" 
                id={pokeJson.id} 
                key={pokeJson.id}
                onClick={this.handleClick}
            >
                <div 
                    className='card m-1' 
                    id="generalViewPokemonDiv"
                >
                    <img className="card-img-top text-center" src={pokeJson.sprites.front_default} alt={`${pokeJson.name}.png`} />
                    <div className="card-body">
                        <h5 className="card-title text-center text-capitalize">{pokeJson.name}</h5>
                        <h5 className="card-title text-center text-capitalize">{`Id: ${pokeJson.id}`}</h5>
                        <h6 className="card-subtitle mb-2 text-muted text-center text-capitalize">{types}</h6>
                    </div>
                </div>
            </div>
        )
    }
}

export default GeneralViewPokemon;