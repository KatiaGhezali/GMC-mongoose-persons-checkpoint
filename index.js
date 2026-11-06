//Connect to MongoDB
require("dotenv").config();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

//Create the Person schema and model
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

//Create and save one person
const createAndSavePerson = async (done) => {
  try {
    const person = new Person({
      name: "Katia",
      age: 25,
      favoriteFoods: ["pizza", "pasta", "sushi"],
    });

    const savedPerson = await person.save();

    console.log("Person saved:", savedPerson);

    if (done) done(null, savedPerson);
  } catch (error) {
    if (done) done(error);
    else console.error(error);
  }
};

//Create multiple people
const createManyPeople = async (arrayOfPeople, done) => {
  try {
    const people = await Person.create(arrayOfPeople);

    console.log("People created:", people);

    if (done) done(null, people);
  } catch (error) {
    if (done) done(error);
    else console.error(error);
  }
};

//Find people by name
const findPeopleByName = async (personName, done) => {
  try {
    const people = await Person.find({ name: personName });

    console.log("People found:", people);

    if (done) done(null, people);
  } catch (error) {
    if (done) done(error);
    else console.error(error);
  }
};

//Find one person by favorite food
const findOneByFood = async (food, done) => {
  try {
    const person = await Person.findOne({
      favoriteFoods: food,
    });

    console.log("Person found:", person);

    if (done) done(null, person);
  } catch (error) {
    if (done) done(error);
    else console.error(error);
  }
};

// Find a person by Id
const findPersonById = async (personId, done) => {
  try {
    const person = await Person.findById(personId);

    console.log("Person found:", person);

    if (done) done(null, person);
  } catch (error) {
    if (done) done(error);
    else console.error(error);
  }
};

// Update: find, modify, and save
const findEditThenSave = async (personId, done) => {
  try {
    const person = await Person.findById(personId);

    if (!person) {
      throw new Error("Person not found");
    }

    person.favoriteFoods.push("hamburger");

    const updatedPerson = await person.save();

    console.log("Updated person:", updatedPerson);

    if (done) done(null, updatedPerson);
  } catch (error) {
    if (done) done(error);
    else console.error(error);
  }
};

//Update a person using findOneAndUpdate()
const findAndUpdate = async (personName, done) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true },
    );

    console.log("Updated person:", updatedPerson);

    if (done) done(null, updatedPerson);
  } catch (error) {
    if (done) done(error);
    else console.error(error);
  }
};

//Delete one person by Id

const removeById = async (personId, done) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(personId);

    console.log("Deleted person:", deletedPerson);

    if (done) done(null, deletedPerson);
  } catch (error) {
    if (done) done(error);
    else console.error(error);
  }
};

//Delete all people named Mary

const removeManyPeople = async (done) => {
  try {
    const result = await Person.deleteMany({ name: "Mary" });

    console.log("Deletion result:", result);

    if (done) done(null, result);
  } catch (error) {
    if (done) done(error);
    else console.error(error);
  }
};

//Use query helpers

const queryChain = async (done) => {
  try {
    const people = await Person.find({
      favoriteFoods: "burritos",
    })
      .sort({ name: 1 })
      .limit(2)
      .select("-age")
      .exec();

    console.log("Query results:", people);

    if (done) done(null, people);
  } catch (error) {
    if (done) done(error);
    else console.error(error);
  }
};

//Export the functions

module.exports = {
  Person,
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain,
};
