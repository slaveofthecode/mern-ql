import mongoose from "mongoose";
import PersonSchema from "../schemas/person.schema.js";

const Person = mongoose.model("Person", PersonSchema, "Persons");

export default Person;
