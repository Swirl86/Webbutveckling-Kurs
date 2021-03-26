import bkgColors from "./bkgColors";

const Utils = {
    fetchPokemonData: (url) => {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    alert("Error! : " + error.message);
                    throw error;
                });
        });
    },

    getFirstCharToUpperCase: (string) => {
        if (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    },

    getIdStyle: (id) => {
        if (id) {
            return id.toString().padStart(3, "0");
        }
    },

    getBkgColor: (pokemonInfo) => {
        if (pokemonInfo === undefined || pokemonInfo.length === 0) {
            return "#d3d3d3";
        } else {
            let type = pokemonInfo.types[0].type.name;
            return bkgColors[type];
        }
    },

    getTypeColor: (bkgColor, i, type) => {
        /*  bkgColor is the card background color for the main type,
            Green for grass type pokemon etc.*/
        if (i === 0) {
            /* Make the bkgColor color a little darker for the
            type info background*/
            var red = parseInt(bkgColor[1] + bkgColor[2], 16) - 50;
            var green = parseInt(bkgColor[3] + bkgColor[4], 16) - 50;
            var blue = parseInt(bkgColor[5] + bkgColor[6], 16) - 50;
            return "rgb(" + red + "," + green + "," + blue + ")";
        } else {
            return bkgColors[type];
        }
    },
};

export default Utils;
