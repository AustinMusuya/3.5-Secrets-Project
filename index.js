import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import morgan from "morgan";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// Middlewares

// Create Middleware that checks if username is okay and password too
const verify = (req, res, next) => {
  if (
    req.body["Username"] === "austin" &&
    req.body["password"] === "something"
  ) {
    console.log("successful login");
    next();
  } else {
    res.sendFile(__dirname + "/static/index.html");
  }
};

app.use(morgan("combined")); //logs details to console

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/static")); // This middleware serves up static files like css.

// app.use(verify);

// HTTP Request Handlers
app.get("/", function (req, res) {
  //   console.log(req.body);
  res.sendFile(__dirname + "/static/index.html");
});

app.post("/login", verify, (req, res) => {
  console.log(req.body);
  res.sendFile(__dirname + "/static/secrets.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
