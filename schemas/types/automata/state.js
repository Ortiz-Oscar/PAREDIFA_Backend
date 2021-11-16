const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");
const {coordType} = require("./coord.js");
/*
 * Description:
 * Custom state graphQL type for automata type
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
const stateType = new GraphQLObjectType({
    name:'State',
    description:'States of automata',
    fields: ()=>({
        id:{ type:GraphQLString },
        name:{ type:GraphQLString },
        coord:{ type: coordType},
        end:{type: GraphQLBoolean},
        start:{type:GraphQLBoolean}
    })
})
module.exports = {
    stateType
}