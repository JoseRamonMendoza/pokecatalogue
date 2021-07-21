import React, {useState, useEffect} from 'react';

// Dependencias
import axios from 'axios';
import ReactPaginate from 'react-paginate';

// CSS
import './css/main.min.css';

// Compontentes propios
import GeneralViewPokemon from './GeneralViewPokemon';
import FancyJumbotron from './FancyJumbotron';
import SearchBars from './SearchBars';
import DetailViewPokemon from './DetailViewPokemon';
import PokemonMoves from './PokemonMoves';

// Componente principal, este componente engloba todos los demas
// y es el componente padre en donde se define el 'state' y 
// la lógica del programa
export default function CatalogueContainer() {
    // estado necesario para la paginación
    const perPage = 18;
    const [currentPage, setCurrentPage] = useState(0)
    const [pageCount, setPageCount] = useState(0)

    // estado necesario para la busqueda
    const [searchText, setSearchText] = useState('')

    // estado necesario para la lógica
    const [pokemones, setPokemones] = useState([])
    const [pokeJson, setPokeJson] = useState(null)



    // fetch donde consigo el total de pokemones,
    // necesario para calcular la cantidad de páginas
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=-1&offset=1`)
            .then(result => {
                const count = result.data.count;
                setPageCount(Math.ceil(count / perPage))
            })
            .catch(console.error)
    }, [])

    // fetch donde consigo un Json que contiene la url a todos
    // los pokemones de la página actual; se actualiza cada que
    // el número de la página se actualiza
    useEffect(() => {
        const offset = currentPage * perPage;
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${perPage}&offset=${offset}`)
            .then(result => {
                fetchPokemones(result.data.results)
                setPokeJson(result.data.results)
            })
            .catch(console.error)
    }, [currentPage])

    // fetch donde obtengo la información detallada de cada pokemon
    // de la página actual
    function fetchPokemones(pokeJson){
        if(!pokeJson) return;

        const data = [];
        const promise = pokeJson.map(pokemon => 
            axios.get(pokemon.url)
                .then(result => data.push(result.data))
                .catch(console.error)
        )

        Promise.all(promise).then(() => {
            data.sort((a,b) => a.id - b.id);
            return setPokemones(data)
        })
    }
    
    // función de manejo de la acción de busqueda; realizo un
    // fetch y regreso la información detallada de un solo pokemon
    function handleSearchAction() {
        if(!searchText) return;

        const data = [];
        const promise = axios.get(`https://pokeapi.co/api/v2/pokemon/${searchText}`)
            .then(result => data.push(result.data))
            .catch(error => alert(`No encontrado, favor de validar, error ${error}`))

        Promise.all([promise]).then(() => setPokemones(data));
    }

    // manejo de evento para cambiar de página
    function handlePageClick(e){
        setCurrentPage(e.selected)
        setSearchText('')
    }

    // manejo de evento para cambiar el texto de busqueda
    // necesario ya que el texto se encuentra en un
    // componente hijo
    function handleSearchTextChange(searchText) {
        setSearchText(searchText)
    }

    return (
        <FancyJumbotron>
            
            <SearchBars 
                searchText={searchText} 
                onFilterTextChange={handleSearchTextChange} 
                onSearchAction={handleSearchAction}
            />



            <div className="row justify-content-center">
                {
                    pokemones.length > 1 ? 
                    pokemones.map(pokemon => {
                        return <GeneralViewPokemon
                            key={pokemon.id}
                            pokeJson={pokemon}     
                            onFilterTextChange={handleSearchTextChange}
                            onSearchAction={handleSearchAction} 
                        />
                    }) :
                    pokemones.length === 1 &&
                    <div>
                    <DetailViewPokemon
                        pokemon={pokemones[0]}
                        onFilterTextChange={handleSearchTextChange}
                        onSearchAction={fetchPokemones}
                        pokeJson={pokeJson}
                    /> 
                    <PokemonMoves 
                        pokemon={pokemones[0]}
                    />
                    </div>
                }
            </div>

            
            
            <div className="row">
                {  
                    <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination d-flex justify-content-center"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
                }
            </div>
 
        </FancyJumbotron>
    )
}