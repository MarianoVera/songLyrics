import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import Informacion from "./components/Informacion";
import Axios from "axios";

function App() {
  const [busquedaLetra, guardarBusquedaLetra] = useState({});
  const [error, guardarError] = useState(false);
  const [letra, guardarLetra] = useState("");
  const [info, guardarInfo] = useState({});

  useEffect(() => {
    if (Object.keys(busquedaLetra).length === 0) return;

    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaLetra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      /* const [letraAPI, infoAPI] = await Promise.all([Axios(url), Axios(url2)]); */

      Axios.all([Axios.get(url), Axios.get(url2)])
        .then(
          Axios.spread((letraAPI, infoAPI) => {
            guardarLetra(letraAPI.data.lyrics);
            guardarInfo(infoAPI.data.artists[0]);
          })
        )
        .catch((error) => {
          guardarError(true);
        });
      guardarError(false);

      /* guardarLetra(letraAPI.data.lyrics);
      guardarInfo(infoAPI.data.artists[0]); */
    };

    consultarApiLetra();
  }, [busquedaLetra]);

  return (
    <Fragment>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />
      {error ? (
        <p className="alert alert-danger text-center p-2">
          {" "}
          La canción o el artista son erróneos. Por favor, inténtalo de nuevo.{" "}
        </p>
      ) : null}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Informacion info={info} />
          </div>

          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
