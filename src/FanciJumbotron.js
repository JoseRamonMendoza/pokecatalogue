export default function FanciJumbotron(props){
    return (
        <div className="jumbotron">
            <h1 className="display-4">Catalogo de Pokemones</h1>
            <p className="lead">Puedes buscar un pokemon en el catalogo por Nombre o por ID</p>
            <hr className="my-4"></hr>
            <div className="container">
                <div className="center-block">

                {props.children}

                </div>
            </div>
        </div>
    )
}