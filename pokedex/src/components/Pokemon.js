import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../App.css";
import Utils from "../Utils/Utils";

const Pokemon = (props) => {
    const { pokemonId } = useParams();
    const [pokemonInfo, setPokemonInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    const pokemonImage = `https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`;
    const bkgColor = Utils.getBkgColor(pokemonInfo); //  Pokemon main type color
    let img =
        pokemonInfo.length !== 0 ? pokemonInfo.sprites.front_default : "#";

    /* Updated data for the pokemon, to set with updateData function */
    const pokemonData = {
        id: pokemonId,
        name: pokemonInfo.name,
        url,
        img,
        color: bkgColor,
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            if (response.status === 200) {
                const data = await response.json();
                setPokemonInfo(data);
                setLoading(false);
            } else {
                alert("Error! Status : " + response.status);
            }
        };
        fetchData();
    }, [url]);

    return (
        <div className="container">
            <Link
                to={{
                    pathname: "/",
                }}
            >
                <button
                    className="btn-back"
                    onClick={() => {
                        props.location.updateData(pokemonData);
                    }}
                >
                    Back
                </button>
            </Link>
            {loading ? (
                <h1 className="loading-message">{"Loading Data . . ."}</h1>
            ) : (
                <div
                    className="pokemon-info-wrapper"
                    style={{ backgroundColor: bkgColor }}
                >
                    <div className="pokemon-img-div">
                        <img
                            className="big-pokemon-img"
                            src={pokemonImage}
                            alt={pokemonInfo.name}
                        />
                    </div>
                    <h3 className="pokemon-title">
                        #{Utils.getIdStyle(pokemonId)}:
                        {Utils.getFirstCharToUpperCase(pokemonInfo.name)}
                    </h3>
                    <div className="stats-wrapper">
                        <div>
                            <h4 className="stats-title">Weight</h4>
                            <p>{pokemonInfo.weight}</p>
                        </div>
                        <div>
                            <h4 className="stats-title">Height</h4>
                            <p>{pokemonInfo.height}</p>
                        </div>
                        <div>
                            <h4 className="stats-title">Exp</h4>
                            <p>{pokemonInfo.base_experience}</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="info-title">Type</h4>
                        <div className="info-wrapper">
                            {pokemonInfo.types === undefined
                                ? " "
                                : pokemonInfo.types.map((pokemon, i) => {
                                      return (
                                          <div
                                              className="info"
                                              style={{
                                                  backgroundColor: Utils.getTypeColor(
                                                      bkgColor,
                                                      i,
                                                      [pokemon.type.name]
                                                  ),
                                              }}
                                              key={i}
                                          >
                                              {Utils.getFirstCharToUpperCase(
                                                  pokemon.type.name
                                              )}
                                          </div>
                                      );
                                  })}
                        </div>
                    </div>
                    <div>
                        <h4 className="info-title">Abilities</h4>
                        <div className="info-wrapper">
                            {pokemonInfo.abilities === undefined
                                ? ""
                                : pokemonInfo.abilities.map((pokemon, i) => {
                                      return (
                                          <div
                                              className="info"
                                              style={{
                                                  backgroundColor: "lightgray",
                                              }}
                                              key={i}
                                          >
                                              {Utils.getFirstCharToUpperCase(
                                                  pokemon.ability.name
                                              )}
                                          </div>
                                      );
                                  })}
                        </div>{" "}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pokemon;
