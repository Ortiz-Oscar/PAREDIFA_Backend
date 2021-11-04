const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql');
const {automataType} = require('../models/automata');
const { aboutType } = require('../models/about')
const { sendImage } = require('../utils/sendImage')
const { getAutomata, listAllAutomatas, saveAutomata } = require('../config/automataService');
const { aboutService } = require('../config/aboutService');

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
        },
        sendAutomata:{
            type:GraphQLString,
            description:'Sends an email with an image of the automata in base64 to an email direction',
            args:{
                mailAddres:{type:GraphQLString},
                binaryInfo: { type: GraphQLString },
                studentName: { type: GraphQLString },
                studentId: { type: GraphQLString },
                studentSchedule: { type: GraphQLString },
            },
            resolve: (_, args) => sendImage(args)
        },
        about:{
            type:aboutType,
            description:'General information about the project',
            resolve: () => aboutService()
        }
    })
})
const automataMutation = new GraphQLObjectType({
    name:'Automata_mutation',
    description:'Write a new automata on database',
    fields:()=>({
        saveAutomata : {
            type : automataType,
            description:'Save a new automata to database',
            args:{
                id : { type:GraphQLString },
                name : { type:GraphQLString },
                alphabet : { type:GraphQLList(GraphQLString) },
                states: { type:GraphQLList(inputStateType) },
                transitions: {type:GraphQLList(inputTransitionType)}
            },
            resolve:( _ , args ) => saveAutomata(args.id, args.name, args.alphabet, args.states, args.transitions),
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