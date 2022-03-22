require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const path = require("path");
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors());

const {
  createUser,
  updateUser,
  getUsers,
  deleteUser,
} = require("./controller");

// Endpoints
app.get("/getUsers", getUsers);
app.post("/createUser", createUser);
app.put("/updateUser/", updateUser);
app.delete("/deleteUser/:id", deleteUser);

app.listen(PORT, () => {
  console.log(`Warped to ${PORT}`);
});
