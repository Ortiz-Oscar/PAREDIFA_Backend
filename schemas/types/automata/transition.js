const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { transitionStateType } = require("./transitionstate.js");
const { coordType } = require("./coord.js")
/*
 * Description:
 * Custom transition graphQL type for automata type
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
const transitionType = new GraphQLObjectType({
    name:'Transition',
    description:'Transition of automata',
    fields:()=>({
        id:{ type:GraphQLString },
        state_src_id:{ type: transitionStateType },
        state_dst_id:{ type: transitionStateType },
        symbols:{ type:GraphQLList(GraphQLString) },
        coordTemp: {type:coordType}
    })
})
module.exports = { transitionType }