<<<<<<< HEAD
//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

let userIsAuthorised = false;


app.use(bodyParser.urlencoded({ extended: true }))


const log = (req, res, next) => {
    console.log('Request Method: ', req.method)
    console.log('Request URL: ', req.url)
    const password = req.body["password"]; //this code checks the html element named password at the password field

    //the code below then checks if what user entered and what is required matches
    if (password === 'Austin'){
        userIsAuthorised = true
    }

    next();
}


app.use(log);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });


app.post('/check', (req, res) => {
    userIsAuthorised ? res.sendFile(__dirname + "/public/secret.html") : res.redirect(__dirname + "/public/index.html");
    console.log(req.body);
});

app.listen(port,() => {
    console.log(`Listening on port ${port}`);
})
=======
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
>>>>>>> middleware
