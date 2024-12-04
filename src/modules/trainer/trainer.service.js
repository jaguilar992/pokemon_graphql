import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Pokemon } from "../pokemon/pokemon.model.js";
import { Trainer } from "./trainer.model.js";
import { JWT_SECRET } from "../../config/index.js";

export const login = async (email, password) => {
  const trainer = await Trainer.findOne({ email });
  if (!trainer) {
    throw new Error("Trainer not found");
  }
  const isMatch = await bcrypt.compare(password, trainer.password);
  if (!isMatch) {
    throw new Error("Incorrect password");
  }
  const token = jwt.sign({ 
    id: trainer._id,
    email: trainer.email,
    name: trainer.name,
  }, JWT_SECRET, { expiresIn: "1h" });
  return { token, trainer };
};

export const createTrainer = async (trainer) => {
  const existingTrainer = await Trainer.findOne({ email: trainer.email });
  if (existingTrainer) {
    throw new Error("Trainer with this email already exists");
  }
  const hashedPassword = await bcrypt.hash(trainer.password, 10);
  const newTrainer = await Trainer.create({ ...trainer, password: hashedPassword });
  return newTrainer;
};

export const getTrainers = async () => {
  const resp = await Trainer.find().populate("pokemons").exec();
  return resp;
};

export const getTrainerById = async (id) => {
  const resp = await Trainer.findById(id).populate("pokemons").exec();
  return resp;
};

export const addPokemonToTrainerByNumber = async (trainerId, pokemonNumber) => {
  const pokemon = await Pokemon.findOne({ number: pokemonNumber });
  if (!pokemon) {
    throw new Error(`Pokemon with number ${pokemonNumber} not found`);
  }
  const trainer = await Trainer.findByIdAndUpdate(
    trainerId,
    { $addToSet: { pokemons: pokemon._id } },
    { new: true }
  )
    .populate("pokemons")
    .exec();
  return trainer;
};

export const removePokemonFromTrainerByNumber = async (
  trainerId,
  pokemonNumber
) => {
  const pokemon = await Pokemon.findOne({ number: pokemonNumber });
  if (!pokemon) {
    throw new Error(`Pokemon with number ${pokemonNumber} not found`);
  }
  const trainer = await Trainer.findByIdAndUpdate(
    trainerId,
    { $pull: { pokemons: pokemon._id } },
    { new: true }
  )
    .populate("pokemons")
    .exec();
  return trainer;
};
