import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Utils from "../Utils/Utils";

const PokemonList = (props) => {
    const [loading, setLoading] = useState(true);
    const url = "https://pokeapi.co/api/v2/pokemon?limit=102";

    const addPokemonData = async (data) => {
        let pokemonData = await Promise.all(
            data.map((pokemon, index) => {
                return {
                    id: index + 1,
                    name: pokemon.name,
                    url: pokemon.url,
                    img: "#",
                    color: "#d3d3d3",
                };
            })
        );
        props.setPokemons(pokemonData);
    };

    useEffect(() => {
        /* On startup the props.pokemons is empty, fetch data one time. */
        if (props.pokemons.length === 0) {
            const fetchPokemons = async () => {
                let response = await Utils.fetchPokemonData(url);
                await addPokemonData(response.results);
            };
            fetchPokemons();
        }
        setLoading(false);
        // eslint-disable-next-line
    }, [url]);

    /* Pokemon.js - Sent updated data for one pokemon that the user clicked on */
    function updateData(pokemonData) {
        const copy = [...props.pokemons];
        const index = props.pokemons
            .map((pokemon) => pokemon.name)
            .indexOf(pokemonData.name);
        copy[index] = pokemonData;
        props.setPokemons(copy);
    }

    const deletePokemon = (name) => {
        props.setPokemons(() => props.pokemons.filter((p) => p.name !== name));
    };

    const PokemonCard = (pokemon) => {
        return (
            <div
                key={`${pokemon.id}-${pokemon.name}`}
                className="card-wrapper "
                style={{ backgroundColor: pokemon.color }}
            >
                <button
                    className="delete-btn"
                    onClick={() => {
                        deletePokemon(pokemon.name);
                    }}
                >
                    Delete
                </button>
                <Link
                    to={{
                        pathname: `/${pokemon.id}`,
                        updateData,
                    }}
                >
                    <div className="card-info-wrapper">
                        <div className="card-img-div">
                            <img
                                className="card-img"
                                alt={pokemon.name}
                                src={pokemon.img}
                            />
                        </div>
                        <h3 className="card-title">
                            #{Utils.getIdStyle(pokemon.id)}:
                            {Utils.getFirstCharToUpperCase(pokemon.name)}
                        </h3>
                    </div>
                </Link>
            </div>
        );
    };

    return (
        <div className="wrapper">
            {loading ? (
                <h1 className="loading-message">Loading Data . . .</h1>
            ) : (
                <>{props.pokemons.map((pokemon) => PokemonCard(pokemon))}</>
            )}
        </div>
    );
};

export default PokemonList;
