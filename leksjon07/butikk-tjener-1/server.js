import express from "express";

const app = express();
const port = 3030;

app.get("/", (req, res) => {
  res.send("Hei verden!");
});

app.listen(port, () => {
  console.log(`Serveren lytter på port ${port}`);
});
