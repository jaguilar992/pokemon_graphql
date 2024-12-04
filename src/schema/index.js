import { typeDefs as pokemonTypeDefs } from "../modules/pokemon/pokemon.typeDefs.js";
import { resolvers as pokemonResolvers } from "../modules/pokemon/pokemon.resolvers.js";
import { typeDefs as trainerTypeDefs } from "../modules/trainer/trainer.typeDefs.js";
import { resolvers as trainerResolvers } from "../modules/trainer/trainer.resolvers.js";

export const typeDefs = [pokemonTypeDefs, trainerTypeDefs];
export const resolvers = [pokemonResolvers, trainerResolvers];


export default { typeDefs, resolvers };