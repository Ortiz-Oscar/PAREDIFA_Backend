const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");
/*
 *
 * Description:
 * Response type to check if automata was saved or it was rejected because of repeated ID
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
const saveStatusType = new GraphQLObjectType({
    name:"Save_Status",
    description:"Check if everything was ok while saving an automata",
    fields:()=>({
        id : { type:GraphQLString, description:"ID of saved automata" },
        repeatedID : { type:GraphQLBoolean,description:"Checks if ID is repeated" },
    })

});
module.exports = {
    saveStatusType
}