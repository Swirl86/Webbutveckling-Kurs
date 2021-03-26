import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import Pokemon from "./components/Pokemon";

function App() {
    const [pokemons, setPokemons] = useState([]);

    return (
        <div className="app">
            <Header />
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={(props) => (
                            <PokemonList
                                {...props}
                                pokemons={pokemons}
                                setPokemons={setPokemons}
                            />
                        )}
                    />
                    <Route exact path="/:pokemonId" component={Pokemon} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
