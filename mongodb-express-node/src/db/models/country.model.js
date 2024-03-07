import mongoose from "mongoose";
import countrySchema from "../schemas/countries.schema.js";

const Country = mongoose.model("Country", countrySchema, "Countries");

// add one register to the collection
export const addCountry = async (country) => {
	const countryExist = await Country.findOne({ name: country.name });

	if (countryExist) return countryExist;

	return await Country.create(country);
};

export default Country;
