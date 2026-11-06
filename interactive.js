require("dotenv").config();

const mongoose = require("mongoose");
const readline = require("readline");

const {
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
} = require("./index");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) => {
  return new Promise((resolve) => rl.question(question, resolve));
};

const run = async () => {
  await mongoose.connection.asPromise();

  console.log("\nConnected to MongoDB!");
  console.log("\nChoose an operation:");
  console.log("1. Create and save one person");
  console.log("2. Create multiple people");
  console.log("3. Find people by name");
  console.log("4. Find one person by favorite food");
  console.log("5. Find person by ID");
  console.log("6. Add hamburger to favorite foods");
  console.log("7. Update person's age");
  console.log("8. Delete person by ID");
  console.log("9. Delete all people named Mary");
  console.log("10. Find people who like burritos");
  console.log("0. Exit");

  while (true) {
    const choice = await ask("\nEnter your choice: ");

    try {
      switch (choice) {
        case "1":
          await createAndSavePerson();
          break;

        case "2":
          await createManyPeople([
            { name: "Mary", age: 25, favoriteFoods: ["pizza", "burritos"] },
            { name: "John", age: 30, favoriteFoods: ["hamburger", "pasta"] },
            { name: "Mary", age: 22, favoriteFoods: ["salad", "burritos"] },
          ]);
          break;

        case "3": {
          const name = await ask("Enter a name: ");
          await findPeopleByName(name);
          break;
        }

        case "4": {
          const food = await ask("Enter a favorite food: ");
          await findOneByFood(food);
          break;
        }

        case "5": {
          const id = await ask("Enter the person's ID: ");
          await findPersonById(id);
          break;
        }

        case "6": {
          const id = await ask("Enter the person's ID: ");
          await findEditThenSave(id);
          break;
        }

        case "7": {
          const name = await ask("Enter the person's name: ");
          await findAndUpdate(name);
          break;
        }

        case "8": {
          const id = await ask("Enter the person's ID: ");
          await removeById(id);
          break;
        }

        case "9":
          await removeManyPeople();
          break;

        case "10":
          await queryChain();
          break;

        case "0":
          console.log("Exiting...");
          rl.close();
          await mongoose.connection.close();
          return;

        default:
          console.log("Invalid choice. Try again.");
      }
    } catch (error) {
      console.error("Operation failed:", error.message);
    }
  }
};

run().catch(async (error) => {
  console.error(error);
  rl.close();
  await mongoose.connection.close();
});
