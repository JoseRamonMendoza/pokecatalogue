import React from 'react';

// Dependecies
import axios from 'axios';
import ReactPaginate from 'react-paginate';

// Css
import './css/main.min.css';

// Personal Components
import GeneralViewPokemon from './GeneralViewPokemon';
import FanciJumbotron from './FanciJumbotron';
import SerchBars from './SerchBars';

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
        this.handleButtonAction = this.handleButtonAction.bind(this);
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
                            <GeneralViewPokemon pokeJson={response.data} />
                        </React.Fragment>
                    );

                    postData.sort((a, b) => a.key - b.key)

                    this.setState({
                        pageCount: Math.ceil(this.state.fullPokeJson.count / this.state.perPage),

                        postData
                    })
                })
        }

    }

    handleButtonAction(e) {

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
            <FanciJumbotron>


                <SerchBars
                    filterText={this.state.filterText}
                    onFilterTextChange={this.handleFilterTextChange}
                    onButtonAction={this.handleButtonAction}
                />


                <div className="row">
                    {this.state.postData}
                </div>
                <div className="row">
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
                </div>
            </FanciJumbotron>
        )
    }
}

export default CatalogueContainer;