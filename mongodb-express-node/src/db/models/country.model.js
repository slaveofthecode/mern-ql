import mongoose from "mongoose";
import countrySchema from "../schemas/countries.schema.js";

const Country = mongoose.model("Country", countrySchema, "Countries");

// add one register to the collection
export const addDefaultCountry = async (country) => {
	return await Country.create(country);
};

export default Country;
