require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
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
// Hosting
app.use(express.static(path.resolve(__dirname, "../build")));

// Endpoints
app.get("/getUsers", getUsers);
app.post("/createUser", createUser);
app.put("/updateUser/", updateUser);
app.delete("/deleteUser/:id", deleteUser);

// Serving
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});
app.listen(PORT, () => {
  console.log(`Arrived at ${PORT}`);
});
