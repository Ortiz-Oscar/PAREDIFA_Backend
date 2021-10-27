const { GraphQLObjectType, GraphQLInt} = require('graphql');
const coordType = new GraphQLObjectType({
    name:'Coord',
    description:'Cordinates of the state',
    fields:()=>({
        x:{type:GraphQLInt},
        y:{type:GraphQLInt}
    })
})


module.exports = {
    coordType
}