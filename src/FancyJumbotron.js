// un elemento Jumbotron de Bootstrap que sirve como componente
// que engloba a los demas y da la apariencia base a la página
export default function FancyJumbotron(props){
    return (
        <div className="jumbotron">
            <h1 className="display-4">Pokemon Catalog</h1>
            <p className="lead">You can search for a pokemon in the catalog by Name or by ID</p>
            <hr className="my-4"></hr>
            <div className="container">
                <div className="center-block">

                {props.children}

                </div>
            </div>
        </div>
    )
}