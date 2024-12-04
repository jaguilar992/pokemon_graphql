import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
	name: String,
	types: [String],
	number: Number,
	image: String,
});

export const Pokemon = mongoose.model("Pokemon", pokemonSchema);
