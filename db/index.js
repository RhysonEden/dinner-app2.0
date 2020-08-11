const { Client } = require("pg");
const DB_NAME = "localhost:5432/recipes-dev";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);
const bcrypt = require("bcrypt");

async function getAllRecipes() {
  const { rows } = await client.query(
    `SELECT *
    FROM recipes;
  `
  );

  return rows;
}
async function createRecipe({
  recipename,
  description,
  ingredients,
  directions,
}) {
  try {
    const result = await client.query(
      `
      INSERT INTO recipes(recipename, description, ingredients, directions)
      VALUES ($1, $2, $3, $4);
    `,
      [recipename, description, ingredients, directions]
    );

    return result;
  } catch (error) {
    throw error;
  }
}

async function createUser({ username, password, email, admin }) {
  try {
    const result = await client.query(
      `
      INSERT INTO users(username, password, email, admin)
      VALUES ($1, $2, $3, $4);
    `,
      [username, password, email, admin]
    );

    return result;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username = $1;
    `,
      [username]
    );
    ("done");
    if (!rows || !rows.length) return null;
    const [user] = rows;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  if (!username || !password) {
    return;
  }

  try {
    const user = await getUserByUsername(username);
    if (!user) return;
    const matchingPassword = await bcrypt.compareSync(password, user.password);
    if (!matchingPassword) return;
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser({ username, password }) {
  try {
    await client.query(
      `
        UPDATE users
        SET password='${password}'
        WHERE username='${username}';
      `
    );
  } catch (error) {
    error;
    throw error;
  }
}

// async function adminUpdate({ username, admin }) {
//   try {
//     await client.query(
//       `
//         UPDATE users
//         SET admin='${admin}'
//         WHERE username='${username}';
//       `
//     );
//   } catch (error) {
//     error;
//     throw error;
//   }
// }

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT *
    FROM users;
  `
  );

  return rows;
}

async function getAllCompanies() {
  const { rows } = await client.query(
    `SELECT *
    FROM company;
  `
  );

  return rows;
}

async function getCompaniesById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM company
    WHERE id=$1;
    `,
      [id]
    );
    "user", user;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUsersByID(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE id=$1;
    `,
      [id]
    );
    "user", user;
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createUser,
  getUserByUsername,
  getUser,
  getAllUsers,
  getUsersByID,
  getAllCompanies,
  getCompaniesById,
  updateUser,
  createRecipe,
  getAllRecipes,
  // adminUpdate,
};
