const express = require("express");
const app = express();
const routes = require("./routes");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//usar arquivos estáticos
app.use(express.static("public"));
//habilitar req.body
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const port = 3000;
app.listen(port, () => console.log("Teste listening on port " + port));
