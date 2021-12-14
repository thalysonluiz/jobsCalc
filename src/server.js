const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/views/index.html");
});

const port = 3000;
app.listen(port, () => console.log("Teste listening on port " + port));
