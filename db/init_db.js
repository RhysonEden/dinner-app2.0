const bcrypt = require("bcrypt");
const SALT_COUNT = 10;
const {
  client,
  getAllUsers,
  createUser,
  getUsersByID,
  getAllCompanies,
  getCompaniesById,
  getUserByUsername,
  createRecipe,
  getAllRecipes,
} = require("./index");

// CREATE TABLE company (
//   id SERIAL PRIMARY KEY,
//   cusnumber varchar UNIQUE NOT NULL,
//   cusname varchar UNIQUE NOT NULL,
//   hold varchar UNIQUE NOT NULL,
//   payterms varchar UNIQUE NOT NULL,
//   phone varchar UNIQUE NOT NULL,
//   address varchar UNIQUE NOT NULL,
//   city varchar UNIQUE NOT NULL
// )

async function createTables() {
  try {
    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar UNIQUE NOT NULL,
          password varchar NOT NULL,
          email varchar NOT NULL,
          admin varchar NOT NULL
        );
          CREATE TABLE recipes (
          id SERIAL PRIMARY KEY,
          recipename varchar NOT NULL,
          description varchar NOT NULL,
          ingredients varchar NOT NULL,
          directions varchar NOT NULL
          );
      `);
  } catch (error) {
    throw error;
  }
}

async function dropTables() {
  try {
    ("Starting to drop tables...");
    await client.query(`
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS recipes;
      `);

    ("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    ("Starting to create users...");
    await new Promise((resolve, reject) => {
      ("here the user");
      bcrypt.hash("gft2020", SALT_COUNT, async function (err, hashedPassword) {
        const arman = await createUser({
          username: "David",
          password: hashedPassword,
          email: "test1@yahoo.com",
          admin: true,
        });
        resolve();
      });
    });

    await new Promise((resolve, reject) => {
      bcrypt.hash("gft2020", SALT_COUNT, async function (err, hashedPassword) {
        const james = await createUser({
          username: "James",
          password: hashedPassword,
          email: "test2@yahoo.com",
          admin: true,
        });
        resolve();
      });
    });
    await new Promise((resolve, reject) => {
      bcrypt.hash("gft2020", SALT_COUNT, async function (err, hashedPassword) {
        const katy = await createUser({
          username: "Katy",
          password: hashedPassword,
          email: "test2@yahoo.com",
          admin: false,
        });
        resolve();
      });
    });

    await new Promise((resolve, reject) => {
      bcrypt.hash("gft2020", SALT_COUNT, async function (err, hashedPassword) {
        const robin = await createUser({
          username: "Kevin",
          password: hashedPassword,
          email: "test3@yahoo.com",
          admin: true,
        });
        robin;
        resolve();
      });
    });

    ("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createIntialRecipes() {
  try {
    const recipes = await createRecipe({
      recipename: "Chicken Cordon Bleu",
      description: "Chicken Cordon Bleu in white wine sauce",
      ingredients:
        "6 Skinless, Boneless chicken breast\n 6 slices of swiss cheest\n6 slices of ham\n3 tablespoons all-purpose flour\n1 teaspoons paprike\n6 tablespoons of butter\n1/2 cup dry white wine\n1 teaspoons chicken bouillon granules\n1 tablespoon cornstarch\n1 cup heavy whipping cream",
      directions:
        "Step 1. Pound chicken breasts if they are too thick. Place a cheese and ham slice on each breast within 1/2 inch of the edges. Fold the edges of the chicken over the filling, and secure with toothpicks. Mix the flour and paprika in a small bowl, and coat the chicken pieces. \n Step 2. Heat the butter in a large skillet over medium-high heat, and cook the chicken until browned on all sides. Add the wine and bouillon. Reduce heat to low, cover, and simmer for 30 minutes, until chicken is no longer pink and juices run clear. \n Step 3. Remove the toothpicks, and transfer the breasts to a warm platter. Blend the cornstarch with the cream in a small bowl, and whisk slowly into the skillet. Cook, stirring until thickened, and pour over the chicken. Serve warm.",
    });
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
  } catch (error) {
    throw error;
  }
}

// await createUser({
//   username: "Katy",
//   password: hashedPassword,
//   email: "test2@yahoo.com",
//   admin: false,
// });

async function testDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createIntialRecipes();
    const recipe = await getAllRecipes();
    // const comp100 = await getCompaniesById(100);
    // const comp200 = await getCompaniesById(200);
    const userArman = await getUserByUsername("arman");
    const userJames = await getUserByUsername("james");
    const userRobin = await getUserByUsername("robin");
    const users = await getAllUsers();
    console.log("username", userArman, userJames, userRobin);
    console.log("all users", users);
    console.log("recipe", recipe);
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
