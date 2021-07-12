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


    analizeFullPokeJson() {
        let i = this.state.currentPage * this.state.perPage;
        let count = i + this.state.perPage < this.state.fullPokeJson.count - 1 ? i + this.state.perPage : this.state.fullPokeJson.count - 1;

        const postData = [];
        for (i; i < count; i++) {
            axios.get(this.state.fullPokeJson.results[i].url)
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

    handleSearchAction() {
        if (this.state.filterText !== '') {

            axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.filterText}`)
                .then(response => {

                    const postData = <React.Fragment>
                        <DetailViewPokemon 
                            pokeJson={response.data} 
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


    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText,
        })
    }


    handlePageClick(e) {
        this.setState({
            currentPage: e.selected,
        }, () => {
            this.receivedData();
        });
    };


    componentDidMount() {
        this.receivedData();
    }


    render() {
        return (
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