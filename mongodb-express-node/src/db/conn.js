import dotenv from "dotenv";
import mongoose from "mongoose";
import { addDefaultCountry } from "./models/country.model.js";

dotenv.config();

const { MONGODB_URI, MONGODB_DBNAME } = process.env;

mongoose.connection.on("connected", () => {
	console.log(`DB is connected on ${MONGODB_URI}`);
});
mongoose.connection.on("error", (err) => {
	console.log("There was an error in the connection to DB :", err);
});

const main = async () => {
	await mongoose.connect(MONGODB_URI, {
		dbName: MONGODB_DBNAME,
		retryWrites: true,
		w: "majority",
	});

	addDefaultCountry({ name: "Argentina", code: "AR" });
};

export default main;
