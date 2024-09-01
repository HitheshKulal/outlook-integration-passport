import express from "express";
import passport from "passport";
import session from "express-session";
import { fileURLToPath } from "url";
const app = express();
import path from "path";
import "./auth.js";
import cookieParser from "cookie-parser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "any_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get(
  "/auth/outlook",
  passport.authenticate("windowslive", {
    scope: [
      "openid",
      "profile",
      "offline_access",
      "https://outlook.office.com/Mail.Read",
    ],
  })
);

app.get(
  "/auth/outlook/callback",
  passport.authenticate("windowslive", { failureRedirect: "/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/protected");
  }
);

app.get("/protected", isLoggedIn, (req, res) => {
  const user = req.user;
  console.log(user);
//   passport.deserializeUser((user, done) => {
//     return done(null, user);
//   });
//   console.log(user);
  res.send("protected");
});

app.get("/failed", (req, res) => {
  res.send("failed");
});

app.listen(3000, () => {
  console.log("Hello world............");
});