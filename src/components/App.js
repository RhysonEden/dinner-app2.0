import React, { useState, useEffect } from "react";

import { getSomething } from "../api";

const App = () => {
  const [message, setMessage] = useState("");
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getSomething()
      .then((response) => {
        console.log(response.recipes);
        let directions = recipes.map((recipe, index) => {
          return recipe.directions.split("\n");
        });
        console.log(directions);
        setRecipes(response.recipes);
        setMessage(directions);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, []);

  function splitDirections(recipes) {
    let arr1 = recipes.toString();
    let str1 = arr1.split("\n");
    let end = str1;
  }

  // const strings = recipes.split("\n");
  // console.log("strings", strings);

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <h2>
        {recipes.map((recipe, index) => (
          <div className="allco">
            <div id={index} className="name">
              Name:{recipe.recipename}
            </div>
            <div className="ingredients">Ingredients: {recipe.ingredients}</div>
            <br />
            <div className="description">Description:{recipe.description}</div>
            <br />
            <div className="phone">Directions:{recipe.directions}</div> <br />
          </div>
        ))}
      </h2>
      <h2>{message}</h2>
    </div>
  );
};

export default App;

//   .map((recipe, index) => (
//   <div className="allco">
//     <div id={index} className="name">
//       Name:{company.cusname}
//     </div>
//     <br />
//     <div className="address">Address:{company.address}</div>
//     <br />
//     <div className="phone">Phone:{company.phone}</div> <br />
//   </div>
// ))}
