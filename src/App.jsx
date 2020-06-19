import React, { useState, useEffect } from "react";
import Loading from "./components/Loading";
import axios from "axios";
import "./assets/scss/App.scss";

const App = () => {
  const [form, setForm] = useState({
    characters: [],
    error: "",
    loading: false,
  });

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then(
        setForm({
          ...form,
          loading: true,
        })
      )
      .then((data) => {
        setTimeout(() => {
          setForm({
            ...form,
            characters: data.data.results,
            loading: false,
          });
        }, 5000);
      })
      .catch((e) => {
        setTimeout(() => {
          setForm({
            ...form,
            error: e,
            loading: false,
          });
        }, 1000);
      });
  }, []);

  return (
    <>
      {form.loading ? (
        <div className="Loading-container">
          <Loading />
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="characters">
          {form.characters.map((character) => (
            <figure key={character.id}>
              <img src={character.image} alt="Imagen" />
              <figcaption>{character.name}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </>
  );
};

export default App;
