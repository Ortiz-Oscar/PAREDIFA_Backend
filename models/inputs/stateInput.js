const { GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLInputObjectType } = require('graphql');
const { inputCoordType } = require('./coordInput')
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

module.exports = { inputStateType }