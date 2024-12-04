
export const typeDefs = `#graphql
  type Trainer {
    _id: ID!
    name: String!
    email: String!
    pokemons: [Pokemon!]!
  }

  type Query {
    trainers: [Trainer!]!
    trainer(ID: ID!): Trainer
  }

  input TrainerInput {
    name: String
    email: String
    password: String
  }

  type LoginResponse {
    token: String!
    trainer: Trainer!
  }

  type Mutation {
    login(email: String!, password: String!): LoginResponse!
    createTrainer(trainer: TrainerInput!): Trainer!
    updateTrainer(ID: ID!, trainer: TrainerInput!): Trainer!
    deleteTrainer(ID: ID!): Trainer!
    addPokemonToTrainer(ID: ID!, pokemon: Int!): Trainer!
    removePokemonFromTrainer(ID: ID!, pokemon: Int!): Trainer!
  }
`;
