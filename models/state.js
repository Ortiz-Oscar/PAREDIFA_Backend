const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require('graphql');
const {coordType} = require('./coord');
const stateType = new GraphQLObjectType({
    name:'State',
    description:'States of automata',
    fields: ()=>({
        id:{ type:GraphQLString },
        name:{ type:GraphQLString },
        coord:{ type: coordType},
        end:{type: GraphQLBoolean},
        start:{type:GraphQLBoolean}
    })
})
module.exports = {
    stateType
}