const mongoose = require("mongoose");
const validator = require("validator");

// create a schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email is already present"],
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  phone: {
    type: Number,
    min: 10,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// new collection for mongodb
const Student =  new mongoose.model("Student", studentSchema);   //you need to add your schema into a model(collection) here student is a collection or model 
module.exports = Student;