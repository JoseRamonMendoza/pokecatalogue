import React from 'react';

class DetailViewPokemon extends React.Component {
    render() {
        const pokeJson = this.props.pokeJson;
        const types = pokeJson.types.map(item => " " + item.type.name);
        return (
            <div className="col-12 d-flex justify-content-center" id={pokeJson.id} key={pokeJson.id}>
                <div className='card m-1 col-12' style={{backgroundColor: '#F0F0C9' }}>
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

export default DetailViewPokemon;