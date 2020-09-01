import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Formulario = ({guardarBusquedaLetra}) => {

    const [ busqueda, guardarBusqueda] = useState({
        artista: '',
        cancion: ''
    })

    const {artista, cancion} = busqueda;

    const [ error, guardarError] = useState(false)

    //Coloca elementos en el state
    const handleChange = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    //Cuando el usuario da submit
    const handleSubmit = e => {
        e.preventDefault(e);

        if(cancion.trim() === '' || artista.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);

        guardarBusquedaLetra(busqueda);
    }

    return ( 
        <div className="bg-info">
         {error ? <p className="alert alert-danger text-center p-2"> Ambos campos son obligatorios </p> : null}
            <div className="container">
                <div className="row">
                    <form 
                    className="col card text-white bg-transparent mb-5 pt-5 pb-2"
                    onSubmit={handleSubmit}
                    >

                        <fieldset>
                            <legend className="text-center">Buscador Letras Canciones</legend>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label> Nombre de Canción</label>
                                        <input
                                        type="text"
                                        className="form-control"
                                        name="cancion"
                                        value={cancion}
                                        placeholder="Nombre de canción"
                                        onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                            <label> Artista</label>
                                            <input
                                            type="text"
                                            className="form-control"
                                            name="artista"
                                            value={artista}
                                            placeholder="Nombre de artista"
                                            onChange={handleChange}
                                            />
                                    </div>
                                </div>

                            </div>

                            <button
                            type="submit"
                            className=" btn btn-primary float-right"
                            >Buscar</button>

                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
     );
}

Formulario.propTypes = {
    guardarBusquedaLetra: PropTypes.func.isRequired
}
 
export default Formulario;