const express = require("express");
const app = express();
const Student = require("../src/model/students");
require("./db/connection");
const port = process.env.PORT || 3000;

//
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello wolrd!!");
});

// specific students data on id
app.get("/students/:id", async (req, res) => {
  console.log("get method call");
  try {
    const id = req.params.id;
    const studentsData = await Student.findById(id);
    res.status(200).send(studentsData);
  } catch (e) {
    res.status(404).send(e);
  }
});

// all studets data
app.get("/students", async (req, res) => {
  try {
    const studentData = await Student.find();
    res.status(200).send(studentData);
  } catch (e) {
    res.status(404).send(e);
  }
});

// Create new student detail
app.post("/students", async (req, res) => {
  //above :for save data to mongodb with async await
  try {
    const user = new Student(req.body);
    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

//find user by id and update useing patch
app.put("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    }); //new:true for live upadate it is optional
    res.status(202).send(updateStudent);
  } catch (e) {
    res.status(204).send(e);
  }
});

// find by is and delete
app.delete("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await Student.findByIdAndDelete(id);
    res.status(202).send(deleteUser);
  } catch (e) {
    res.status(204).send(e);
  }
});

app.listen(port, () => {
  console.log(`Connection is setup at ${port}`);
});

// Create new student detail with promise
// app.post("/students", (req, res) => {
//     console.log(req.body);
//     // for save data to mongodb with promise
//     const user = new Student(req.body);
//     user
//       .save()
//       .then(() => {
//         res.status(201).send(user);
//       })
//       .catch((e) => {
//         res.status(400).send(e);
//       });
//   });
