// Test av cookies i Express.

import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

// Set cookie
app.get("/set-cookie", (req, res) => {
  res.cookie("bruker", "ola", { maxAge: 24 * 60 * 60 * 1000 });
  res.send("Cookie is set");
});

// Get cookie
app.get("/get-cookie", (req, res) => {
  const bruker = req.cookies["bruker"];
  res.send(`Cookie value: ${bruker}`);
});

// Delete cookie
app.get("/delete-cookie", (req, res) => {
  res.cookie("bruker", "", { expires: new Date(0) });
  res.send("Cookie is deleted");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
