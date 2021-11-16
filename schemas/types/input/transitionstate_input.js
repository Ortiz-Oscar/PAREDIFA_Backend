const { GraphQLString, GraphQLFloat, GraphQLInputObjectType } = require('graphql');
/*
 * Description:
 * Custom transition-state graphQL input type for query parameters
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
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