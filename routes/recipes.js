const apiRouter = require("express");
const recipeRouter = apiRouter.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getAllRecipes, createRecipe } = require("../db");
const SALT_COUNT = 10;

recipeRouter.get("/all", async (req, res, next) => {
  try {
    console.log("hittin here");
    const recipes = await getAllRecipes();
    res.send({ recipes });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = recipeRouter;
