const { GraphQLObjectType, GraphQLFloat} = require('graphql');
const coordType = new GraphQLObjectType({
    name:'Coord',
    description:'Cordinates of the state',
    fields:()=>({
        x:{type:GraphQLFloat},
        y:{type:GraphQLFloat}
    })
})

module.exports = {
    coordType
}