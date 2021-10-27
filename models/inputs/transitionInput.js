const { GraphQLString, GraphQLList, GraphQLInputObjectType } = require('graphql');
const inputTransitionType = new GraphQLInputObjectType({
    name:'Transition_input',
    fields:()=>({
        id:{type:GraphQLString},
        state_src_id:{type:GraphQLString},
        state_dst_id:{type:GraphQLString},
        symbols:{type:GraphQLList(GraphQLString)},
    })
})

module.exports = { inputTransitionType }