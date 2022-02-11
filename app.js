import express from "express";
import bodyParser from "body-parser";
import { engine } from "express-handlebars";
import fs from "node:fs";

// Handlebars Objects Starts

const homeObj = JSON.parse(fs.readFileSync("./json/home.json"));
const courseObj = JSON.parse(fs.readFileSync("./json/course.json"));
const courseDetailObj = JSON.parse(fs.readFileSync("./json/courseDetail.json"));
const contactObj = JSON.parse(fs.readFileSync("./json/contact.json"));
const coachesObj = JSON.parse(fs.readFileSync("./json/coaches.json"));
const aboutObj = JSON.parse(fs.readFileSync("./json/about.json"));
const testimonialObj = JSON.parse(fs.readFileSync("./json/testimonial.json"));
const notFoundObj = JSON.parse(fs.readFileSync("./json/404NotFound.json"));

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Handlebars Engine

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// Pages Request

app.get("/", (req, res) => {
  res.render("index", homeObj);
});

app.get("/courses", (req, res) => {
  res.render("course", courseObj);
});

app.get("/courses/:id/details", (req, res) => {
  const { id } = req.params;
  if (id > 11) {
    res.status(404).render("404NotFound", notFoundObj);
  }
  res.render("courseDetail", courseDetailObj.details[id]);
});

app.get("/testimonials", (req, res) => {
  res.render("testimonial", testimonialObj);
});

app.get("/coaches", (req, res) => {
  res.render("coaches", coachesObj);
});

app.get("/about", (req, res) => {
  res.render("about", aboutObj);
});

app.get("/contact", (req, res) => {
  res.render("contact", contactObj);
});

// 404 Not Found Page

app.get("*", (req, res) => {
  res.status(404).render("404NotFound", notFoundObj);
});

// Enquirey Form Route

app.post("/enquirey-form", (req, res) => {
  res.json({
    message: "It's Working",
  });
});

app.listen(port, () => {
  console.log(`Active On Port ${port}`);
});
