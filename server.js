const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
app.use(cookieParser());


// require('dotenv').config(); // Load environment variables from .env file

const jwt = require('jsonwebtoken');
// const secretKey = process.env.JWT_SECRET_KEY; // Access the secret key




const PORT = 4000
// app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`))
const connectDB = require("./db");
//Connecting the Database


const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`),
)

connectDB()

// require('dotenv').config();
// const secretKey = process.env.JWT_SECRET_KEY; // Access the secret key

app.use(bodyParser.json());
// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})

app.use(express.json());
app.use("/api/auth", require("./Auth/Route"));


app.use((req, res, next) => {
    const rawData = req.body.toString(); // Capture the raw data as a string
    console.log('Request Data:', rawData);
    next();
  });

const { adminAuth, userAuth,authenticationAuth } = require("./middleware/auth.js");

app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));

app.set("view engine", "ejs");


app.get("/logout", (req, res) => {
    res.cookie("jwt", "", { maxAge: "1" })
    res.redirect("/")
  })
app.get("/",authenticationAuth, (req, res) => res.render("home"))
app.get("/register", (req, res) => res.render("register"))
app.get("/login", (req, res) => res.render("login"))
app.get("/admin", adminAuth, (req, res) => res.render("admin"))
app.get("/basic", userAuth, (req, res) => res.render("user"))