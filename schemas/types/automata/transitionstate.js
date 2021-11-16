const { GraphQLObjectType, GraphQLString, GraphQLFloat } = require('graphql');
/*
 * Description:
 * Custom transition-state graphQL type for transition type
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
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