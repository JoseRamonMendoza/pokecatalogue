import React, {useState } from 'react';

export default function PokemonMoves(props){
    const [movesChecked, setMovesChecked] = useState([])

    function handleSumbitAction() {
        const types = props.pokemon.types.map(item => " " + item.type.name);

        let config = {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: props.pokemon.id,
                name: props.pokemon.name,
                types: types,
                moves: movesChecked,
            })
        }

        fetch('http://localhost/json', config)
        .then(response => {
            console.log(response)
        })
    }

    function steamrollArray(arr) {
      const flat = [].concat(...arr);
      return flat.some(Array.isArray) ? steamrollArray(flat) : flat;
    }

    function defineCheckedArray(move){
        if(!movesChecked.includes(move)){
            return steamrollArray(movesChecked.concat(move))
        } else {
            let index = movesChecked.indexOf(move)
            let shallowCopy = movesChecked.slice()
            shallowCopy.splice(index, 1,)
            return shallowCopy
        }
    }

    return (
        <React.Fragment>
            <form 
                className=" card detail-card " 
                onSubmit={() => handleSumbitAction() }
            >
                <div className="card-body ">
                    <h3 className="card-title">{`Moves of ${props.pokemon.name}`}</h3>

                    <div className="d-flex flex-wrap ">
                        {
                            props.pokemon.moves.length !== 0 ? 
                            props.pokemon.moves.map((pokemon) =>
                                <div 
                                    className="col-md-3 col-xs-6 d-flex align-pokemons-center p-1"
                                    key={pokemon.move.name}
                                >
                                    <input 
                                        className="mx-2" 
                                        type="checkbox" 
                                        id={pokemon.move.name} 
                                        name={pokemon.move.name} 
                                        value={pokemon.move.name} 
                                        onClick={() => setMovesChecked(() => defineCheckedArray(pokemon.move.name))}
                                        disabled={ !movesChecked.includes(pokemon.move.name) && movesChecked.length === 4 }
                                    />
                                    <label 
                                        className="text-capitalize m-0" 
                                        htmlFor={pokemon.move.name}>{pokemon.move.name}</label>
                                </div>
                            ) :
                            <h5 className="text-muted text-center">There no information about the movements of this pokemon. You can send the data without the movements anyway.</h5> 
                        }
                    </div>

                    <div className="d-flex justify-content-end">
                        <button
                          className="col-3 m-2 btn btn-outline-success "
                          type="submit"
                        >Send</button>
                    </div>
                </div>
                
            </form>
        </React.Fragment>
    )
}