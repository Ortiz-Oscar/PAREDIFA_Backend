const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
} = require("graphql");
const {
  deleteAutomata,
  saveAutomata,
  replaceAutomata,
} = require("../../resolvers/automataresolver.js");
const { automataType } = require("../types/automata.js");
const { inputStateType } = require("../types/state_input.js");
const { inputTransitionType } = require("../types/transition_input.js");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutate data stored on database",
  fields: () => ({
    saveAutomata: {
      type: automataType,
      description: "Save a new automata on database",
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        alphabet: { type: GraphQLList(GraphQLString) },
        states: { type: GraphQLList(inputStateType) },
        transitions: { type: GraphQLList(inputTransitionType) },
      },
      resolve: (_, args) =>
        saveAutomata(
          args.id,
          args.name,
          args.alphabet,
          args.states,
          args.transitions
        ),
    },
    deleteAutomata: {
      type: GraphQLBoolean,
      description: "Delete a single automata stored on db",
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => deleteAutomata(args.id),
    },
    replaceAutomata: {
      type: GraphQLBoolean,
      description: "Replace a single automata stored on database",
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        alphabet: { type: GraphQLList(GraphQLString) },
        states: { type: GraphQLList(inputStateType) },
        transitions: { type: GraphQLList(inputTransitionType) },
      },
      resolve: (_, args) =>
        replaceAutomata(
          args.id,
          args.name,
          args.alphabet,
          args.states,
          args.transitions
        ),
    },
  }),
});

module.exports = { mutation };
