/*
 *
 * Description: Database conection for neo4j querys in resolvers
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
const neo4j = require("neo4j-driver");

//We use the driver object to create neo4j sessions, each session can run only a query at a time and each session
//is binded to his scope
const driver = neo4j.driver(
  process.env.databaseURL,
  neo4j.auth.basic(process.env.databaseuser, process.env.databasepassword), //Username and password
  {
    /* encrypted: 'ENCRYPTION_OFF' */
  }
);
module.exports = {
  driver,
};
