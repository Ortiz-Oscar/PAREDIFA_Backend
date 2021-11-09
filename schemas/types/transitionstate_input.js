const { GraphQLString, GraphQLFloat, GraphQLInputObjectType } = require('graphql');
const transitionStateInputType = new GraphQLInputObjectType({
    name:'Transition_state_input',
    description:'State reference in transitions to save automatas',
    fields:()=>({
        id: {type:GraphQLString} ,
        x : {type:GraphQLFloat} , 
        y: {type:GraphQLFloat} ,
    })
})
module.exports = { transitionStateInputType }