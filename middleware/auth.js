const jwt = require("jsonwebtoken")
require('dotenv').config();
const jwtSecret = process.env.jwtSecret;
exports.adminAuth = (req, res, next) => {
  const token = req.cookies.jwt
  console.log(token)
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" })
      } else {
        if (decodedToken.role !== "admin") {
          return res.status(401).json({ message: "Not authorized" })
        } else {
          res.render("admin");
        }
      }
    })
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" })
  }
}



exports.userAuth = (req, res) => {
    const token = req.cookies.jwt
    console.log(token)
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" })
        } else {
          if (decodedToken.role !== "Basic") {
            return res.status(401).json({ message: "Not authorized" })
          } else {
            res.render("user");
          }
        }
      })
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available" })
    }
  }



exports.authenticationAuth=(req,res)=>{
    const token = req.cookies.jwt
    console.log(token)
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" })
        } else {
          if (decodedToken.role == "Basic" ||decodedToken.role == "Admin" ) {
            // return res.status(401).json({ message: "TOken Verified" })
            res.render("user")
          } else {
            res.render("admin");
          }
        }
      })
    } else {
    //   return res
        // .status(401)
        // .json({ message: "Not authorized, token not available" })
        res.render("register");
    }
}
let x="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzZlNDkzY2IyM2YyMmZmZThhOTZkYiIsInVzZXJuYW1lIjoiaml5YSIsInJvbGUiOiJCYXNpYyIsImlhdCI6MTY5ODE1MzI0MiwiZXhwIjoxNjk4MTY0MDQyfQ.lmFdGzcNwbjgrNYMApjP6bmczoafS8FDL0M_eXi3SH0"
let y="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzdjM2ExYTcyODJmYzQxNjM2YjU0NCIsInVzZXJuYW1lIjoiaml5YSIsInJvbGUiOiJCYXNpYyIsImlhdCI6MTY5ODE1MzM3NywiZXhwIjoxNjk4MTY0MTc3fQ.HROwY88xkMF2LZNI4p62BKNV0RLoJVUbcbqJLnwCxIw"
let z="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzdjNTA5MmVkODgxZjY2YWQxMjYwYSIsInVzZXJuYW1lIjoibmlhIiwicm9sZSI6IkJhc2ljIiwiaWF0IjoxNjk4MTUzNzM3LCJleHAiOjE2OTgxNjQ1Mzd9.cdcawgTUN-HPrSnon7A8E2lA6IbKgnZ8nmdS149TWTo"



