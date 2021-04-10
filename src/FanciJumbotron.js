export default function FanciJumbotron(props){
    return (
        <div className="jumbotron">
            <h1 className="display-4">Catalogo de Pokemones</h1>
            <p className="lead">Busca en todo el catalogo de pokemones</p>
            <hr className="my-4"></hr>
            <div className="container">
                <div className="center-block">

                {props.children}

                </div>
            </div>
        </div>
    )
}