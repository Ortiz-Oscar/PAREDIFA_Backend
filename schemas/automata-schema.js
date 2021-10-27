const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLNonNull, GraphQLInt } = require('graphql');
const {automataType} = require('../models/automata')
let { getAutomata, listAllAutomatas, saveAutomata } = require('../config/automataCRUD');
const { inputStateType } = require('../models/inputs/stateInput')
const { inputTransitionType } = require('../models/inputs/transitionInput');
const automataQuery = new GraphQLObjectType({
    name:'Automata_query',
    fields:()=>({
        singleAutomata:{
            type:automataType,
            description:'Returns a single automata based on id',
            args:{
                id:{type:GraphQLString}
            },
            resolve: (_, args)=>{
                return getAutomata(args.id)
            }
        },
        allAutomatas:{
            type:GraphQLList(automataType),
            description:'Returns a list of all automatas saved',
            resolve: ()=> listAllAutomatas(),
        }
    })
});
const automataMutation = new GraphQLObjectType({
    name:'Automata_mutation',
    description:'Write a new automata on database',
    fields:()=>({
        saveAutomata : {
            type : automataType,
            description:'Save a new automata to database',
            args:{
                id : { type:GraphQLString },
                alphabet : { type:GraphQLList(GraphQLString) },
                states: { type:GraphQLList(inputStateType) },
                transitions: {type:GraphQLList(inputTransitionType)}
            },
            resolve:( _ , args ) => saveAutomata(args.id, args.alphabet, args.states, args.transitions),
        }
    })
});
const automataSchema = new GraphQLSchema({
    query: automataQuery,
    mutation: automataMutation
})
module.exports = {
    automataSchema
}