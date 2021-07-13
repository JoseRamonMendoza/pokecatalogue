// Esta es la clase principal que engloba todos los demas componentes
  
import React from 'react';

// Dependecies
import axios from 'axios';
import ReactPaginate from 'react-paginate';

// Css
import './css/main.min.css';

// Personal Components
import GeneralViewPokemon from './GeneralViewPokemon';
import FancyJumbotron from './FancyJumbotron';
import SerchBars from './SerchBars';
import DetailViewPokemon from './DetailViewPokemon';

/**
 * componente que contiene la lógica completa de obtener la información
 * de la API y guardarla, también conteiene la lógica para manejar la barra
 * de paginación.
 * 
 * State
 * la barra de paginación está siendo manejara por react-paginate https://www.npmjs.com/package/react-paginate
 * el estado de la aplicacion perPage, currentPage, pageCount son necesarios para la paginación.
 * 
 * 'filterText' es el estado del texto en la barra de busqueda
 * 
 * 'fullPokeJason' guarda el JSON con todos los pokemons que da la pokeapi
 * 
 * Events
 * 'handlePageClick' es el manejador de evento para el cambio de página
 * 
 * 'handleFilterTextChange' es el manejador de evento para el actualizar el texto en la barra de busqueda
 * ya que la barra de busqueda es un componente hijo entonces paso el estado al hijo para que este sea 
 * el que modifique el estado del texto 
 * 
 * 'handleSearchAction' es el manejador de evento que hace la busqueda en la pokeapi cuando se tiene un 
 * texto en la barra de busqueda o se selecciona alguna carta de pokemon.
 */
class CatalogueContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            perPage: 18,
            currentPage: 0,
            filterText: '',
            fullPokeJson: null,
        };
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleSearchAction = this.handleSearchAction.bind(this);
    }

    /**
     * receivedData es el primer método en ejecutarse, se ejecuta en cada 
     * componentDidMount(al iniciar la app), y
     * handlePageClick(al presionar en un boton del paginado)
     * 
     * este método hace la petición a la pokeapi con una busqueda de todos los pokemon 
     * que hay, y guarda esa información en un JSON que se guarda en el 'state' fullPokeJson 
     */
    receivedData() {
        if (this.state.fullPokeJson === null) {
            axios.get('https://pokeapi.co/api/v2/pokemon?limit=-1&offset=0')
                .then(response => {
                    const data = response.data;
                    this.setState({
                        fullPokeJson: data,
                    })

                    this.analizeFullPokeJson();
                })
        } else {
            this.analizeFullPokeJson();
        }
    }

    /**
     * GeneralViewPokemon es un componente que utilizar a su vez el componente 'card'
     * de Bootstrap, por lo que cada GeneralViewPokemon es una carta de pokemon.
     * 
     * analizeFullPokeJson es el método encargado de renderizar tantas 'cartas de pokemon'
     * sea necesaria dependiendo del estado actual de la aplicación (en que pagina estamos)
     * para hacer esto necesitamos saber en que pagina estamos y cuantas 'cartas' queremos
     * mostrar por página
     * 
     * 'init' es el indice inicial, desde que pokemon vamos a empezar renderizar
     * 'end' es el indice final, hasta que pokemon vamos a renderizar
     * para calcular 'end' utilizo la informacion dentro de fullPokeJason.count que tiene
     * el total de los pokemons que tenemos disponibles, esto lo hago para no tener un outset
     *
     * se hace un bucle en donde se guardo todas las 'cartas pokemon' en 'postData' una constante
     * que se añadirá al estado de la apliicación, (antes de actualizar el 'state' postData lo ordeno) 
     * 
     * pageCount es la cantidad de páginas totales y es una variable necesaria en react-paginate
     */
    analizeFullPokeJson() {
        let init = this.state.currentPage * this.state.perPage;
        let end = init + this.state.perPage < this.state.fullPokeJson.count - 1 ? init + this.state.perPage : this.state.fullPokeJson.count - 1;

        const postData = [];
        for (init; init < end; init++) {
            axios.get(this.state.fullPokeJson.results[init].url)
                .then(response => {
                    postData.push(
                        <React.Fragment key={response.data.id}>
                            <GeneralViewPokemon
                                pokeJson={response.data}
                                onFilterTextChange={this.handleFilterTextChange}
                                onSearchAction={this.handleSearchAction}
                            />
                        </React.Fragment>
                    );

                    postData.sort((a, b) => a.key - b.key);

                    this.setState({
                        pageCount: Math.ceil(this.state.fullPokeJson.count / this.state.perPage),
                        postData,
                    });
                });
        };

    }

    /**
     * handleSearchAction se ejecutará cada vez que se presiones la barra de 'Search'
     * o se presione sobre una 'carta pokemon' (si se presiona sobre una carta pokemon
     * se actualizará el texto de busqueda con el id de dicha carta)
     * 
     * en el momento de ejecutarse se realizará la busqueda de dicho texto en la pokeapi
     * y regresará una sola 'carta pokemon', dicha carta presentará más infomración y será 
     * manejada por el componente DetailViewPokemon
     */
    handleSearchAction() {
        if (this.state.filterText !== '') {

            axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.filterText}`)
                .then(response => {

                    const postData = <React.Fragment>
                        <DetailViewPokemon 
                            pokeJson={response.data} 
                            onFilterTextChange={this.handleFilterTextChange}
                            onSearchAction={this.handleSearchAction}
                        />
                    </React.Fragment>

                    this.setState({
                        pageCount: null,
                        postData,
                    })
                })
                .catch(error => {
                    alert(`No encontrado en la base de datos, error: ${error}`)
                })
        } else {
            this.analizeFullPokeJson();
        }
    }

    // evento necesario para propagar el texto
    // de busqueda al componetne hijo
    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText,
        })
    }

    // evento necesario para cambiar la página
    handlePageClick(e) {
        this.setState({
            currentPage: e.selected,
        }, () => {
            this.receivedData();
        });
    };

    // evento inicial de la app
    componentDidMount() {
        this.receivedData();
    }


    render() {
        return (
            // englobo todos los componentes en un Jumbotron de Bootstrap
            // this.state.postData contiene todas las 'cartas pokemon'
            <FancyJumbotron>

                <SerchBars
                    filterText={this.state.filterText}
                    onFilterTextChange={this.handleFilterTextChange}
                    onSearchAction={this.handleSearchAction}
                />

                <div className="row">
                        {this.state.postData}
                </div>

                <div className="row">
                    {   this.state.pageCount &&
                        <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination d-flex justify-content-center"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                    }
                </div>
            </FancyJumbotron>
        )
    }
}

export default CatalogueContainer;