// # 1
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// #2  Crear una representacion de los datos
let SWSchema = Schema({
  routeName: String,
  name: String,
  role: String,
  age: String,
  forcePoints: String,
});

//  3
module.exports = mongoose.model("starwars", SWSchema);
