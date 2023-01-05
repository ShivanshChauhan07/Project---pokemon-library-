import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card";
import Cards from "./Cards";
import Input from "./Input";
import Loading from "./Loading";

let clear = "";
const URL2 = "https://pokeapi.co/api/v2/pokemon?limit=20";

function App() {
  const [pokemon, setPokemon] = useState("");
  const [allPokemon, setAllPokemon] = useState([]);
  const [loadPokemon, setLoadpokemon] = useState(URL2);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState();
  const [done, setDone] = useState(false);

  const showMore = () => {
    clear = "";
    getpokemon(clear);
  };

  const reset = () => {
    clear = URL2;
    setPokemon("");
    getpokemon(clear);
    setAllPokemon([]);
    setDone(false);
  };

  const pokemonList = async (poke) => {
    console.log("i m in pokemonList");
    console.log(poke);
    poke.map(async (singlePoke) => {
      const res = await fetch(singlePoke.url);
      const data = await res.json();
      // console.log(data);
      const specificData = {
        id: data.id,
        sprites: data.sprites,
        name: data.name,
        types: data.types,
        stats: data.stats,
      };
      setAllPokemon((prev) => {
        return [...prev, specificData];
      });
    });
  };
  // console.log(pokemon);

  const getpokemon = async (opt) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch(opt === "" ? loadPokemon : opt);
        const data = await response.json();
        setLoadpokemon(data.next);
        console.log("I m in getpokemon");
        pokemonList(data.results);
        console.log(data.results);
        setLoading(false);
        opt = "";
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }, 2000);
  };
  // console.log("why i m here");
  const specificPokemonData = async () => {
    setLoading(true);
    setDone(false);
    setTimeout(async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${search}/`
        );
        setPokemon(await response.json());
        setLoading(false);
        setSearch("");
        console.log(pokemon);
      } catch (error) {
        setLoading(false);
        alert("No Result Found !");
        console.log(error);
      }
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDone(true);
  };

  useEffect(() => {
    clear = "";
    getpokemon(clear);
  }, []);

  useEffect(() => {
    if (done) specificPokemonData();
  }, [done]);

  return (
    <div className="app-container">
      <h1>Pokemon World</h1>
      <div className="form-container">
        <Input
          search={search}
          setSearch={setSearch}
          handleSubmit={handleSubmit}
          reset={reset}
        />
      </div>
      <div className="already">
        <h2>Already Searched:</h2>
      </div>
      {loading ? (
        <Loading />
      ) : pokemon === "" ? (
        <div className="all-container">
          {allPokemon.map((singlePokemon, index) => {
            return <Cards key={index} {...singlePokemon} />;
          })}
        </div>
      ) : null}
      {pokemon !== "" ? (
        loading ? null : (
          <div className="all-container2">
            <Card {...pokemon} />
          </div>
        )
      ) : null}
      <div className="btn-container">
        <button type="button" className="show-more" onClick={showMore}>
          Show More
        </button>
      </div>
    </div>
  );
}

export default App;
