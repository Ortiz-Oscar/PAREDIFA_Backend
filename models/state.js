const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean } = require('graphql');
const {coordType} = require('./coord');
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
module.exports = {
    stateType
}