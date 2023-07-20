// Dependencies
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const SW = require("./model/starwars");
var cors = require("cors");
const app = express();
const PORT = 5000;

// Cross - Origin Resource Sharing
app.use(cors());
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((e) => console.log("MongoDB ready"))
  .catch(console.error);

// Data
const characters = [
  {
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000,
  },
  {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200,
  },
  {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Master",
    age: 55,
    forcePoints: 1350,
  },
];

// Routes
app.get("/", function (req, res) {
  res.send("Welcome to the Star Wars Page!");
});

// Displays all characters
app.get("/api/characters", async function (req, res) {
  let datos = await SW.find();
  return res.json(datos);
  // return res.json(characters);
});

// Displays a single character, or shows "No character found"
app.get("/api/characters/:character", async function (req, res) {
  const chosen = req.params.character;

  console.log(chosen);

  let datos = await SW.find({ routeName: chosen });

  /*for (let i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {
      return res.json([characters[i]]);
    }
  }*/

  return res.json(datos);
});

// Create New Characters - takes in JSON input
app.post("/api/characters", async function (req, res) {
  const newcharacter = req.body;

  console.log(newcharacter);

  let personaje = new SW(newcharacter);
  await personaje.save();

  //characters.push(newcharacter);

  res.json(personaje);
});

app.delete("/api/delete/:id", async function (req, res) {
  let id = req.params.id;
  let personaje = await SW.findOne({ _id: id });
  await personaje.deleteOne();
  res.json({});
});

app.put("/api/update", async function (req, res) {
  const personaje = req.body;
  await SW.updateOne(personaje);

  res.json(personaje);
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
