const { GraphQLObjectType, GraphQLFloat} = require('graphql');
/*
 * Description:
 * Custom coordinate graphQL type for state and transition type
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
const coordType = new GraphQLObjectType({
    name:'Coord',
    description:'Cordinates of the state',
    fields:()=>({
        x:{type:GraphQLFloat},
        y:{type:GraphQLFloat}
    })
})

module.exports = {
    coordType
}