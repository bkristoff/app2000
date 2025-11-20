import express from "express";
import session from "express-session";
const app = express();

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Set session variable
app.get("/set-session", (req, res) => {
  req.session.bruker = "ola";
  res.send("Session variable is set");
});

// Get session variable
app.get("/get-session", (req, res) => {
  const bruker = req.session.bruker;
  res.send(`Session variable value: ${bruker}`);
});

// Check and unset session variable
app.get("/unset-session", (req, res) => {
  if (req.session.bruker) {
    delete req.session.bruker;
    res.send("Session variable is unset");
  } else {
    res.send("No session variable to unset");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
