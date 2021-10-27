const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLInputObjectType } = require('graphql');
const {coordType, inputCoordType} = require('./coord');
const stateType = new GraphQLObjectType({
    name:'State',
    description:'States of automata',
    fields: ()=>({
        id:{ type:GraphQLString },
        name:{ type:GraphQLString },
        coord:{ type: coordType},
        radius: {type: GraphQLInt},
        end:{type: GraphQLBoolean},
        start:{type:GraphQLBoolean}
    })
})

const inputStateType = new GraphQLInputObjectType({
    name:'Input_state',
    fields:()=>({
        id:{ type:GraphQLString },
        name:{ type:GraphQLString },
        coord:{ type: inputCoordType},
        radius: {type: GraphQLInt},
        end:{type: GraphQLBoolean},
        start:{type:GraphQLBoolean}
    })
})
module.exports = {
    stateType, inputStateType
}