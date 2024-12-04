import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	pokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }],
});

export const Trainer = mongoose.model("Trainer", trainerSchema);
