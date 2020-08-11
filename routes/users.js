const apiRouter = require("express");
const usersRouter = apiRouter.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  createUser,
  getUserByUsername,
  getUser,
  getAllUsers,
  updateUser,
  // adminUpdate,
} = require("../db");
const SALT_COUNT = 10;

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send({ users });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.get("/getUserInfo", async (req, res, next) => {
  try {
    req.user;
    if (req.user) {
      res.send({ user: req.user });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  req.body;

  if (!username || !password) {
    next({
      name: "MissingUserNameOrPassword",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUser({ username, password });
    process.env.JWT_SECRET;
    if (!user) {
      next({
        name: "WrongUserNameOrPassword",
        message: "Username or password is incorrect",
      });
    } else {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1w" }
      );
      res.send({ message: "you're logged in!", token, user });
    }
  } catch (error) {
    error;
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const queriedUser = await getUserByUsername(username);
    if (queriedUser) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    } else if (password.length < 1) {
      next({
        name: "PasswordLengthError",
        message: "Password Too Short!",
      });
    } else {
      bcrypt.hash(password, SALT_COUNT, async function (err, hashedPassword) {
        const user = await createUser({
          username,
          password: hashedPassword,
          email,
          admin: false,
        });
        ("bcrypt ending");
        if (err) {
          next(err);
        } else {
          const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1w" }
          );
          res.send({ message: "you're logged in!", token, user });
        }
      });
    }
  } catch (error) {
    next(error);
  }
});
usersRouter.post("/update", async (req, res, next) => {
  ("User Update Route");
  try {
    const { username, password } = req.body;
    await new Promise((resolve, reject) => {
      bcrypt.hash(password, SALT_COUNT, async function (err, hashedPassword) {
        const user = await updateUser({
          username: username,
          password: hashedPassword,
        });
      });
      resolve();
    });
    res.send({ message: "Password Changed" });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/admin", async (req, res, next) => {
  ("User Update Route");
  try {
    const { username, admin } = req.body;

    const user = await adminUpdate({
      username: username,
      admin: admin,
    });
    res.send({ message: "Admin Updated" });
  } catch (error) {
    next(error);
  }
});
module.exports = usersRouter;
