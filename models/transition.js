const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const transitionType = new GraphQLObjectType({
    name:'Transition',
    description:'Transition of automata',
    fields:()=>({
        id:{type:GraphQLString},
        state_src_id:{type:GraphQLString},
        state_dst_id:{type:GraphQLString},
        symbols:{type:GraphQLList(GraphQLString)},
    })
})
module.exports = { transitionType }