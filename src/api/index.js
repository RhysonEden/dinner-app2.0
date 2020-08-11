import axios from "axios";

export async function getSomething() {
  try {
    console.log("trying");
    const { data } = await axios.get("/api/recipes/all");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(username, password) {
  try {
    const { data } = await axios.post("/api/users/login", {
      username,
      password,
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", data.user.username);
    localStorage.setItem("admin", JSON.stringify(data.user.admin));
    localStorage.setItem("id", data.user.id);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function registerUser(username, password, email) {
  try {
    const { data } = await axios.post("/api/users/register", {
      username,
      password,
      email,
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", data.user.username);
    localStorage.setItem("id", data.user.id);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function userUpdate(username, password) {
  try {
    const { data } = await axios.post("api/users/update", {
      username,
      password,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function adminUpdate(username, admin) {
  try {
    const { data } = await axios.post("api/users/admin", {
      username,
      admin,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getUserInfo() {
  try {
    const user = await axios.get("/api/users/getUserInfo", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}
