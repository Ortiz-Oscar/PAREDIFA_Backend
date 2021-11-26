/*
 *
 * Description:
 * Parse data retrieved from db into client objects
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */

/**
 * Parse db retrieve data into an automata
 * @param {*} id id of requested automata
 * @param {*} queryResults result array from resolved promises
 * @returns a client type automata
 */
function parseDBAutomata(id, queryResults){
    return {
        id,
        regex: queryResults[0].records[0].get("regex"),
        alphabet: queryResults[1].records[0].get("a").properties.symbols,
        states: queryResults[2].records.map((s) => s.get("s").properties),
        transitions: queryResults[3].records.map((t) => {
          let transition = t.get("t").properties;
          transition.state_src_id = {
            id: transition.state_src_id,
            x: transition.src_coord.x,
            y: transition.src_coord.y,
          };
          transition.state_dst_id = {
            id: transition.state_dst_id,
            x: transition.dst_coord.x,
            y: transition.dst_coord.y,
          };
          return transition;
        }),
    };
}
function parseDBAbout(resultSet){
  return { //Object that is to be sent
    authors: resultSet[0].records.map((a) => a.get("author").properties),
    team: resultSet[1].records[0].get("team").properties,
    course: resultSet[2].records[0].get("course").properties,
    term: resultSet[3].records[0].get("term").properties,
    version: resultSet[4].records[0].get("version").properties,
  }
}
module.exports = {
    parseDBAutomata,
    parseDBAbout
}