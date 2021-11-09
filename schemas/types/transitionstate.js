const { GraphQLObjectType, GraphQLString, GraphQLFloat } = require('graphql');
const transitionStateType = new GraphQLObjectType({
    name:'Transition_state',
    description:'State reference in transitions',
    fields:()=>({
        id: {type:GraphQLString},
        x : {type:GraphQLFloat}, 
        y: {type:GraphQLFloat}
    })
})
module.exports = { transitionStateType }