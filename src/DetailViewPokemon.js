import React from 'react';

export default function DetailViewPokemon(props){

    function handleClick(){
        props.onFilterTextChange('')
        props.onSearchAction(props.pokeJson);
    }

    const pokemon = props.pokemon;
    //const types = pokemon.types.map(item => " " + item.type.name);

    return(
        <React.Fragment key={pokemon.id}>
            <div className="card d-flex flex-wrap flex-row" style={{backgroundColor:"#F0F0C9", maxWidth:"60rem"}} key={pokemon.id}>

                <img className="col-md-4 " src={pokemon.sprites.front_default} alt={`${pokemon.name}.png`} />

                <div className="col-md-8 card-body ">
                    <div className="row align-items-center ">
                        <button
                          className="col-3 btn btn-outline-success"
                          onClick={() => handleClick() }
                        >Return</button> 

                        <h3 className="col-8 mb-0 text-center text-capitalize">{`${pokemon.name} Id:${pokemon.id}`}</h3>
                    </div>

                    <hr/>

                    <div className="row">
                        {pokemon.stats.map((stat) =>
                            <p key={stat.stat.name} className="text-capitalize mb-2 col-6">
                                {`${stat.stat.name}: ${stat.base_stat}`}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            

            <div className="card">
                
            </div>
        </React.Fragment>
    )
}