const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLNonNull, GraphQLInputObjectType } = require('graphql');
const { transitionType } = require('./transition')
const {stateType} = require('./state')
const automataType = new GraphQLObjectType({
    name:'Automata',
    description:'Automata representation',
    fields: () => ({
        id:{ type: GraphQLNonNull(GraphQLString) },
        name:{ type: GraphQLNonNull(GraphQLString) },
        alphabet: {type: GraphQLNonNull(GraphQLList(GraphQLString))},
        states:{type: GraphQLNonNull(GraphQLList(stateType))},
        transitions:{type: GraphQLNonNull(GraphQLList(transitionType))},
        name:{type: GraphQLNonNull(GraphQLString)}
    })
})


module.exports = {
    automataType
}