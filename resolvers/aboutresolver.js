const { driver } = require("../db/dbconection.js");
const cache = require("../utils/cachemanager.js")
const { parseDBAbout } = require("../utils/dbdataadapter.js")
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
 */

/**
 * @description Retrieves the project information from database
 * @returns an about object retrieved from database
 */
async function aboutResolver() {
  try{
    if(cache.has("about_Info")){
      return cache.get("about_Info");
    }
    const session = driver.session();
    let querys = [
      //Authors
      await session.run("match(:Authors)-[:author]->(A:Author) return A as author;"),
      //Team
      await session.run("match(:Authors)-[:team]->(t:Team) return t as team;"),
      //Course
      await session.run("match(:Authors)-[:course]->(C:Course) return C as course;"),
      //Term
      await session.run("match(:Authors)-[:term]->(t:Term) return t as term;"),
      //Version
      await session.run("match(:Authors)-[:version]->(v:Version) return v as version;"),
    ]
    const resultSet = await Promise.all(querys);
    session.close();
    const about_Info = parseDBAbout(resultSet)
    cache.set("about_Info", about_Info);
    return about_Info;
  }catch(error){
    return { error }
  }
}
module.exports = { aboutResolver };
