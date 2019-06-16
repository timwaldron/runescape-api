const rsapi = require("./rsapi.js");
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();


const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log("LOG:", req.method, req.path, req.ip);
  next();
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const pokemonSchema = new Schema({
  name: String,
});


mongoose.createConnection('mongodb://localhost/pokemondb', {useNewUrlParser: true});
const pokemon = mongoose.model('pokemon', pokemonSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/views/about.html");
});

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/examples", (req, res) => {
  res.sendFile(__dirname + "/views/examples.html");
});

app.get("/api/:game/:username", (req, res) => {
  let params = {
    game: req.params.game.toLowerCase(),
    category: "main",
    username: req.params.username.toLowerCase().replace(" ", "_"),
  }

  switch(params.game) {
    case "osrs":
      rsapi.fetchOSRSHiscore(params).then((result) => res.json(result));
      return;

    case "rs3":

      break;

    default:
      res.json({"error": `'${req.params.game}' is an invalid gametype`});
      return;
  }

  res.json({url: apiList.osrsHiscores});
});

app.get("/api/:game/:category/:username", (req, res) => {
  let params = {
    game: req.params.game.toLowerCase(),
    category: req.params.category.toLowerCase(),
    username: req.params.username.toLowerCase().replace(" ", "_"),
  }

  switch(params.game) {
    case "osrs":
        rsapi.fetchOSRSHiscore(params).then((result) => res.json(result));
      return;

    case "rs3":

      break;

    default:
      res.json({"error": `'${req.params.game}' is an invalid gametype`});
      return;
  }

  res.json({url: apiList.osrsHiscores});
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000!`);
});