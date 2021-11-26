const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLNonNull } = require('graphql');
const { transitionType } = require('./transition.js')
const {stateType} = require('./state.js')
/*
 * Description:
 * Custom automata graphQL type for querys
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
const automataType = new GraphQLObjectType({
    name:'Automata',
    description:'Automata representation',
    fields: () => ({
        id:{ type: GraphQLNonNull(GraphQLString) },
        regex:{ type: GraphQLNonNull(GraphQLString) },
        alphabet: {type: GraphQLNonNull(GraphQLList(GraphQLString))},
        states:{type: GraphQLNonNull(GraphQLList(stateType))},
        transitions:{type: GraphQLNonNull(GraphQLList(transitionType))},
    })
})


module.exports = {
    automataType
}