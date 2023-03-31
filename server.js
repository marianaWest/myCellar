// declare variables

require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const app = express();
const PORT = 7500;
const mongoose = require("mongoose");
const WinePT = require("./models/winePT");
const WineBR = require("./models/wineBR");

const bodyParser = require("body-parser");

const winePT = require("./models/winePT");
const wineBR = require("./models/wineBR");

app.use(bodyParser.urlencoded({ extended: true }));

// middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect to mongoDB via mongoose
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true }, () => {
  console.log("Connected to database");
});

app.get("/", async (req, res) => {
  let winePTCol;
  let wineBRCol;
  try {
    winePTCol = await WinePT.find({});
    wineBRCol = await WineBR.find({});
    res.render("index.ejs", { winePTCol, wineBRCol });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.route("/addCellar1").get((req, res) => {
  res.render("addCellar1.ejs");
  console.log("cellar 1");
});

app.post("/addCellar1", async (req, res) => {
  const winePT = new WinePT({
    name: req.body.name,
    winery: req.body.winery,
    vintage: req.body.vintage,
    wineType: req.body.wineType,
    region: req.body.region,
    numberOfBottles: req.body.numberOfBottles,
  });
  try {
    await winePT.save();
    console.log(winePT);
    res.redirect("/");
  } catch (err) {
    if (err) return res.status(500).send(err);
    res.redirect("/");
  }
});

// edit or update PT
app
  .route("/edit/:id")
  .get((req, res) => {
    const id = req.params.id;

    WinePT.find({}, (err, winesPT) => {
      res.render("edit.ejs", {
        winesPT: winesPT,
        idBottlePT: id,
      });
    });
  })
  .post((req, res) => {
    const id = req.params.id;
    WinePT.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        winery: req.body.winery,
        vintage: req.body.vintage,
        region: req.body.region,
        wineType: req.body.wineType,
        numberOfBottles: req.body.numberOfBottles,
      },

      (err) => {
        if (err) return res.status(500).send(err);
        res.redirect("/");
      }
    );
  });

// edit or update BR
app
  .route("/editBR/:id")
  .get((req, res) => {
    const id = req.params.id;

    WineBR.find({}, (err, winesBR) => {
      res.render("editBR.ejs", {
        winesBR: winesBR,
        idBottleBR: id,
      });
    });
  })
  .post((req, res) => {
    const id = req.params.id;
    WineBR.findByIdAndUpdate(
      id,
      {
        nameBR: req.body.nameBR,
        wineryBR: req.body.wineryBR,
        vintageBR: req.body.vintageBR,
        regionBR: req.body.regionBR,
        wineTypeBR: req.body.wineTypeBR,
        numberOfBottlesBR: req.body.numberOfBottlesBR,
      },

      (err) => {
        if (err) return res.status(500).send(err);
        res.redirect("/");
      }
    );
  });

// delete PT
app.route("/remove/:id").get((req, res) => {
  const id = req.params.id;
  WinePT.findByIdAndRemove(id, (err) => {
    if (err) return res.status(500).send(err);
    res.redirect("/");
  });
});

// delete BR
app.route("/removeBR/:id").get((req, res) => {
  const id = req.params.id;
  WineBR.findByIdAndRemove(id, (err) => {
    if (err) return res.status(500).send(err);
    res.redirect("/");
  });
});

// POST BR

app.route("/addCellar2").get((req, res) => {
  res.render("addCellar2.ejs");
  console.log("cellar 2");
});

app.post("/addCellar2", async (req, res) => {
  const wineBR = new WineBR({
    nameBR: req.body.nameBR,
    wineryBR: req.body.wineryBR,
    vintageBR: req.body.vintageBR,
    regionBR: req.body.regionBR,
    numberOfBottlesBR: req.body.numberOfBottlesBR,
    wineTypeBR: req.body.wineTypeBR,
  });
  try {
    await wineBR.save();
    console.log(wineBR);
    res.redirect("/");
  } catch (err) {
    if (err) return res.status(500).send(err);
    res.redirect("/");
  }
});

// initiatize server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
