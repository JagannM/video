const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: "c11", as: true },
  { id: 2, name: "c2", as: false },
  { id: 3, name: "c3", as: true },
];

app.get("/", (req, res) => {
  res.send(courses);
});

app.post("/api/courses/", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
    as: req.body.as,
  };
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  courses.push(course);
  res.send(courses);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    as: Joi.boolean(),
  });
  return schema.validate(course);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
