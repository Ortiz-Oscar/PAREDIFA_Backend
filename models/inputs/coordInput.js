const { GraphQLInt, GraphQLInputObjectType} = require('graphql');
const inputCoordType = new GraphQLInputObjectType({
    name:'Coord_input',
    fields:()=>({
        x:{type:GraphQLInt},
        y:{type:GraphQLInt}
    })
})

module.exports = {inputCoordType}