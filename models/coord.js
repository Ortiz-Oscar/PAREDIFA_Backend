const { GraphQLObjectType, GraphQLInt, GraphQLInputObjectType} = require('graphql');
const coordType = new GraphQLObjectType({
    name:'Coord',
    description:'Cordinates of the state',
    fields:()=>({
        x:{type:GraphQLInt},
        y:{type:GraphQLInt}
    })
})
const inputCoordType = new GraphQLInputObjectType({
    name:'Coord_input',
    fields:()=>({
        x:{type:GraphQLInt},
        y:{type:GraphQLInt}
    })
})

module.exports = {
    coordType , inputCoordType
}