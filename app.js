import express from "express";
import { engine } from "express-handlebars";
import fs from "node:fs";

// Handlebars Objects

const homeObj = JSON.parse(fs.readFileSync("./json/home.json"));

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.get("/", (req,res) => {
    res.render("index", homeObj);
})

app.listen(port, () => {
    console.log(`Active On Port ${port}`);
})