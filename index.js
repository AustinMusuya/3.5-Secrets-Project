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