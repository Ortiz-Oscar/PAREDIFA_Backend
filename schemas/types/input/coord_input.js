const { GraphQLInputObjectType, GraphQLFloat} = require('graphql');
/*
 * Description:
 * Custom coordinate graphQL input type for query parameters
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
const inputCoordType = new GraphQLInputObjectType({
    name:'Coord_input',
    fields:()=>({
        x:{type:GraphQLFloat},
        y:{type:GraphQLFloat}
    })
})

module.exports = {inputCoordType}