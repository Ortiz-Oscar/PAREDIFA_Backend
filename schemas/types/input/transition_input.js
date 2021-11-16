const { GraphQLString, GraphQLList, GraphQLInputObjectType } = require('graphql');
const { transitionStateInputType } = require('./transitionstate_input.js')
const { inputCoordType } = require('./coord_input.js')
/*
 * Description:
 * Custom transition graphQL input type for query parameters
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
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