const { GraphQLInputObjectType, GraphQLFloat} = require('graphql');
const inputCoordType = new GraphQLInputObjectType({
    name:'Coord_input',
    fields:()=>({
        x:{type:GraphQLFloat},
        y:{type:GraphQLFloat}
    })
})

module.exports = {inputCoordType}