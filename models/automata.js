const { GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql');
const { transitionType } = require('./transition')
const {stateType} = require('./state')
const automataType = new GraphQLObjectType({
    name:'Automata',
    description:'Automata representation',
    fields: () => ({
        id:{ type: GraphQLString },
        alphabet: {type:GraphQLList(GraphQLString)},
        states:{type:GraphQLList(stateType)},
        transitions:{type:GraphQLList(transitionType)},
        name:{type:GraphQLString}
    })
})

module.exports = {
    automataType
}