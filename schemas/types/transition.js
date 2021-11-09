const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const { transitionStateType } = require('./transitionstate');
const { coordType } = require('./coord')
const transitionType = new GraphQLObjectType({
    name:'Transition',
    description:'Transition of automata',
    fields:()=>({
        id:{ type:GraphQLString },
        state_src_id:{ type: transitionStateType },
        state_dst_id:{ type: transitionStateType },
        symbols:{ type:GraphQLList(GraphQLString) },
        coordTemp: {type:coordType}
    })
})
module.exports = { transitionType }