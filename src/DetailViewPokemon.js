import React from 'react';

export default function DetailViewPokemon(props){

    function handleClick(){
        props.onSearchAction(props.pokeJson);
    }

    setTimeout(() => {
        props.onFilterTextChange('')
    }, 1);
    //const types = props.pokemon.types.map(item => " " + item.type.name);

    return(
        <React.Fragment key={props.pokemon.id}>
            <div 
                className="card detail-card d-flex flex-wrap flex-row" 
                key={props.pokemon.id}>

                <img 
                    className="col-md-4 " 
                    src={props.pokemon.sprites.front_default} 
                    alt={`${props.pokemon.name}.png`} />

                <div className="col-md-8 card-body ">
                    <div className="row mx-0 d-flex flex-wrap justify-content-around ">
                        <button
                          className=" col-sm-4 h-25 align-self-center order-2 btn btn-outline-success "
                          onClick={() => handleClick() }
                        >Return</button> 

                        <h3 className="col-sm-8 mb-0 text-center text-capitalize">{`${props.pokemon.name} Id:${props.pokemon.id}`}</h3>
                    </div>

                    <hr/>

                    <div className="row d-flex flex-wrap">
                        {props.pokemon.stats.map((stat) =>
                            <p key={stat.stat.name} className="text-capitalize mb-2 col-sm-6">
                                {`${stat.stat.name}: ${stat.base_stat}`}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}