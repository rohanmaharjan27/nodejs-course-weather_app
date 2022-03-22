const path = require("path");
const express = require("express");
const hbs = require("hbs");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

app.use(cors());

app.use("/images", express.static("images"));

// define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handle bars enginge and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));

//res.render for dynamic pages
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Rohan Maharjan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Rohan Maharjan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "This is help page",
    name: "Rohan Maharjan",
  });
});

// res.send for static pages
// app.get('/help',(req,res)=>{
//     res.send(publicDirPath)
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>');
// })

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided!",
    });
  }

  geocode(req.query.address, (geocodeError, geocodeData) => {
    if (geocodeError) {
      return res.send({ error: geocodeError });
    }

    const { latitude, longitude, place_name } = geocodeData;

    forecast(latitude, longitude, (forecastError, forecastData) => {
      if (forecastError) {
        return res.send({ error: forecastError });
      }

      const { description, temperature, tempUnit } = forecastData;

      return res.send({
        forecast: `${place_name}. ${description} : ${temperature} degree ${tempUnit}`,
        location: place_name,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help Page",
    name: "Rohan Maharjan",
    errorMessage: "Help article not found!",
  });
});

app.get("/promotion/link.txt", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/link.txt"));
});

app.get("/promotion/title.txt", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/title.txt"));
});

// app.get("*", (req, res) => {
//   res.render("404", {
//     title: "Help Page",
//     name: "Rohan Maharjan",
//     errorMessage: "Error 404 - Page Not Found!",
//   });
// });

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
