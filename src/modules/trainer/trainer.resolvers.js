import { auth } from "../../middleware/auth/index.js";
import { Trainer } from "./trainer.model.js";
import {
  getTrainers,
  getTrainerById,
  addPokemonToTrainerByNumber,
  removePokemonFromTrainerByNumber,
	createTrainer,
	login,
} from "./trainer.service.js";

export const resolvers = {
	Query: {
		trainers: auth(async () => getTrainers()),
		trainer: auth(async (_, { ID }) => getTrainerById(ID)),
	},
	Mutation: {
		login: async (_, { email, password }) => login(email, password),
		createTrainer: async (_, { trainer }) => createTrainer(trainer),
		updateTrainer: auth(async (_, { ID, trainer }) => await Trainer.findByIdAndUpdate(ID, trainer, { new: true })),
		deleteTrainer: auth(async (_, { ID }) => await Trainer.findByIdAndDelete(ID)),
		addPokemonToTrainer: auth(async (_, { ID, pokemon }) => addPokemonToTrainerByNumber(ID, pokemon)),
		removePokemonFromTrainer: auth(async (_, { ID, pokemon }) => removePokemonFromTrainerByNumber(ID, pokemon)),
	},
};
