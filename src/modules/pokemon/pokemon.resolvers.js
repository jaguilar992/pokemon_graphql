import { Pokemon } from "./pokemon.model.js";

export const resolvers = {
	Query: {
		pokemons: async () => await Pokemon.find(),
		pokemon: async (_, { number }) => await Pokemon.findOne({ number }),
	},
	Mutation: {
		createPokemon: async (_, { pokemon }) => await Pokemon.create(pokemon),
		updatePokemon: async (_, { id, pokemon }) => await Pokemon.findByIdAndUpdate(id, pokemon, { new: true }),
		deletePokemon: async (_, { id }) => await Pokemon.findByIdAndDelete(id),
	},
};
