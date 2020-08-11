import React, { useState, useEffect } from "react";

import { getSomething } from "../api";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getSomething()
      .then((response) => {
        setRecipes(response.recipes);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, []);

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
