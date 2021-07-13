// un elemento Jumbotron de Bootstrap que sirve como componente
// que engloba a los demas y da la apariencia base a la página
export default function FancyJumbotron(props){
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