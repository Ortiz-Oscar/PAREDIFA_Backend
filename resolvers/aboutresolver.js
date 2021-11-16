const { driver } = require("../db/db.js");

/*
 *
 * Description:
 * Resolver for about querys
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 *
 */

/**
 * @description Makes database querys that retrieves project information from database
 * @returns an about object retrieved from database
 */
async function aboutResolver() {
  try{
    let session = driver.session();
    let querys = [
      await session.run("match(:Authors)-[:author]->(A:Author) return A as author;"),
      await session.run("match(:Authors)-[:team]->(t:Team) return t as team;"),
      await session.run("match(:Authors)-[:course]->(C:Course) return C as course;"),
      await session.run("match(:Authors)-[:term]->(t:Term) return t as term;"),
      await session.run("match(:Authors)-[:version]->(v:Version) return v as version;"),
    ]
    let resultSet = await Promise.all(querys);
    session.close();
    return {
      authors: resultSet[0].records.map((a) => a.get("author").properties),
      team: resultSet[1].records[0].get("team").properties,
      course: resultSet[2].records[0].get("course").properties,
      term: resultSet[3].records[0].get("term").properties,
      version: resultSet[4].records[0].get("version").properties,
    };
  }catch(error){
    return { error }
  }
}
module.exports = { aboutResolver };
