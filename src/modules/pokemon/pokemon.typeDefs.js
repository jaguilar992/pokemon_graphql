
export const typeDefs = `#graphql
  type Pokemon {
    name: String!
    types: [String!]!
    number: Int!
  }

  type Query {
    pokemons: [Pokemon!]!
    pokemon(number: Int!): Pokemon
  }

  input PokemonInput {
    name: String!
    types: [String!]!
    number: Int!
  }

  type Mutation {
    createPokemon(pokemon: PokemonInput!): Pokemon!
    updatePokemon(id: ID!, pokemon: PokemonInput!): Pokemon!
    deletePokemon(id: ID!): Pokemon!
  }
`;
