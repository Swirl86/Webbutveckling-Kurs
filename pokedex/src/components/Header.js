import React from "react";
import pokemonIcon from "../img/pokemon-icon.jpg";

const Navbar = () => {
    return (
        <div className="header">
            <div className="header-row">
                <img className="header-img" src={pokemonIcon} alt="logo" />
                <h1 className="header-title">Pokedex</h1>
                <div></div>
            </div>
        </div>
    );
};

export default Navbar;
