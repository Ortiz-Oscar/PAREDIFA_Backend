/*
 *
 * Description:
 * Database conection for neo4j querys in resolvers
 * user: neo4j
 * password: 4ffg2SxnVRGoeoWxTV0f5qOaJlyiS9EovA4GIvQPGEA
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */

const neo4j = require("neo4j-driver");
const driver = neo4j.driver(
  "neo4j+s://6da34b2b.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "4ffg2SxnVRGoeoWxTV0f5qOaJlyiS9EovA4GIvQPGEA"), //Username and password
  {
    /* encrypted: 'ENCRYPTION_OFF' */
  }
);
module.exports = {
  driver,
};
