// Get dependencies
const express = require("express");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

// import the routing file to handle the default (index) route
const routes = require("./routes");

// ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ...
// const messageRoutes = require("./server/routes/messages");
// const contactRoutes = require("./server/routes/contacts");
// const documentsRoutes = require("./server/routes/documents");

const app = express(); // create an instance of express

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

app.use(logger("dev")); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, "../dist/WDD430-Final")));

// Tell express to map the default route ('/') to the index route
// app.use("/", index);

// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...
app.use("/api", routes);

// Tell express to map all other non-defined routes back to the index page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/WDD430-Final/index.html"));
});

// establish a connection to the mongo database
mongoose.connect(MONGO_URI, { useNewUrlParser: true }, (err, res) => {
  if (err) {
    console.log("Connection failed: " + err);
  } else {
    console.log("Connected to database!");
  }
});

// Define the port address and tell express to use this port
const PORT = process.env.PORT || "3000";
app.set("port", PORT);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(PORT, function () {
  console.log("API running on http://localhost:" + PORT);
});
