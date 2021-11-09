const { GraphQLString, GraphQLBoolean, GraphQLInputObjectType } = require('graphql');
const { inputCoordType } = require('./coord_input')
const inputStateType = new GraphQLInputObjectType({
    name:'Input_state',
    fields:()=>({
        id:{ type:GraphQLString },
        name:{ type:GraphQLString },
        coord:{ type: inputCoordType},
        end:{type: GraphQLBoolean},
        start:{type:GraphQLBoolean}
    })
})

module.exports = { inputStateType }