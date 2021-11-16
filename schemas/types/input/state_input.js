const { GraphQLString, GraphQLBoolean, GraphQLInputObjectType } = require('graphql');
const { inputCoordType } = require('./coord_input.js')
/*
 * Description:
 * Custom state graphQL input type for query parameters
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
const inputStateType = new GraphQLInputObjectType({
    name:'Input_state',
    fields:()=>({
        id:{ type:GraphQLString },
        name:{ type:GraphQLString },
        coord:{ type: inputCoordType},
        end:{type: GraphQLBoolean},
        start:{type:GraphQLBoolean}
    })
})

module.exports = { inputStateType }