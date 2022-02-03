import express from "express";
import { engine } from "express-handlebars";
import fs from "node:fs";

// Handlebars Objects

const homeObj = JSON.parse(fs.readFileSync("./json/home.json"));
const courseObj = JSON.parse(fs.readFileSync("./json/course.json"));
const contactObj = JSON.parse(fs.readFileSync("./json/contact.json"));
const coachesObj = JSON.parse(fs.readFileSync("./json/coaches.json"));
const aboutObj = JSON.parse(fs.readFileSync("./json/about.json"));
const testimonialObj = JSON.parse(fs.readFileSync("./json/testimonial.json"));

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index", homeObj);
});

app.get("/courses", (req, res) => {
  res.render("course", courseObj);
});

app.get("/testimonials", (req,res) => {
  res.render("testimonial", testimonialObj);
})

app.get("/coaches", (req, res) => {
  res.render("coaches", coachesObj);
});

app.get("/about", (req, res) => {
  res.render("about", aboutObj);
});

app.get("/contact", (req, res) => {
  res.render("contact", contactObj);
});

app.listen(port, () => {
  console.log(`Active On Port ${port}`);
});
