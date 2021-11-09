const { GraphQLString, GraphQLList, GraphQLInputObjectType } = require('graphql');
const { transitionStateInputType } = require('./transitionstate_input')
const { inputCoordType } = require('./coord_input')
const inputTransitionType = new GraphQLInputObjectType({
    name:'Transition_input',
    fields:()=>({
        id:{type:GraphQLString},
        state_src_id:{type: transitionStateInputType},
        state_dst_id:{type: transitionStateInputType},
        symbols:{type:GraphQLList(GraphQLString)},
        coordTemp:{type:inputCoordType},
    })
})

module.exports = { inputTransitionType }