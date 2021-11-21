const { json } = require("neo4j-driver-core");
const { driver } = require("../db/db.js");
const cache = require("../utils/cachemanager.js")
/*
 *
 * Description:
 * Handle automata querys on database
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */

/**
 * Retrieves a single automata based on id
 * @param {*} id ID of requested automata
 * @returns a single automata
 */
async function getAutomata(id) {
  try{
    if(cache.has(id)){
      return cache.get(id);
    }
    let session = driver.session();
    let querys = [
      //Returns automata name
      await session.run(`match(a:Automata{id:"${id}"}) return a.regex as regex`),
      //Returns the alphabet
      await session.run(`match (:Automata{id:"${id}"})-[:alphabet]->(a:Alphabet) return a`),
      //Returns the list of states
      await session.run(`match (:Automata{id:"${id}"})-[:states]->(s:State) return s`),
      //Returns the list of transitions
      await session.run(`match (:Automata{id:"${id}"})-[:transitions]->(t:Transition) return t`),
    ]
    let resultSet = await Promise.all(querys);
    session.close();
    let finiteAutomata = {
      id,
      regex: resultSet[0].records[0].get("regex"),
      alphabet: resultSet[1].records[0].get("a").properties.symbols,
      states: resultSet[2].records.map((s) => s.get("s").properties),
      transitions: resultSet[3].records.map((t) => {
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
    cache.set(id, finiteAutomata); //Cachea el automata recuperado
    return finiteAutomata;
  }catch(error){
    return { error }
  }
}

/**
 * Retrieves a list of all the automatas stored on database
 * @returns a list of automatas
 */
async function listAllAutomatas() {
  const session = driver.session();
  let idList = await session.run(`match(a:Automata) return a.id as id`);
  session.close();
  return Promise.all(idList.records.map((id) => getAutomata(id.get("id"))));
}

/**
 * Checks tha number of automatas stored in db with tha same id as tha one of tha parameter
 * @param {*} id 
 * @returns the number of automatas with the same id
 */
async function countIDs(id){
  try{
    const response = await driver.session().run(`match(a:Automata{id:"${id}"}) return count(a) as idQuantity`);
    return response.records[0].get("idQuantity").low;
  }catch( _ ){
    return -1;
  }
}
/**
 * Save a new automata on database
 * @param {*} id ID of automata to save
 * @param {*} regex regular expression associated with automata
 * @param {*} alphabet List of symbols that represents the alphabet of the automata
 * @param {*} states List of states of the automata
 * @param {*} transitions List of transitions of the automata
 * @returns the automata saved on db
 */
async function saveAutomata(id, regex, alphabet, states, transitions) {
  try {
    const idQuantity = await countIDs(id);
    if(idQuantity !== 0){
      throw -1;
    }
    //Creates an automata node
    await driver.session().run(`create(:Automata{ id : '${id}' , regex:'${regex}'});`);
    //Creates a relation between repository node and automata
    await driver.session().run(`match(r:Repository) , (a:Automata) where r.name = 
      'Repo' and a.id = '${id}' create(r)-[:contains]-> (a);`
    );
    //Creates an alphabet node
    await driver.session().run(`create(:Alphabet{id: 'Alp${id}',
      symbols:[${alphabet.map((a) => json.stringify(a))}]});`
    );
    //Creates a relation between automata and alphabet
    await driver.session().run(`match(a:Automata) , (alp:Alphabet)
      where a.id = '${id}' and alp.id = 'Alp${id}' create(a)-[:alphabet]->(alp);`
    );
    //Creates a series of states that belongs to the automata
    await Promise.all(states.map((s) => driver.session().run(`create(:State{ 
      id:'${s.id}', name:'${s.name}' , coord:point({x: ${s.coord.x}, 
      y: ${s.coord.y}}) ,end:${s.end}, start:${s.start}})`
    )));
    //Creates the relations between the saved automata and his states
    await Promise.all(states.map((s) => driver.session().run(`match(a:Automata) ,
      (s:State) where a.id = '${id}' and s.id = '${s.id}' create(a)-[:states]->(s);`
    )));
    //Creates a series of states that belongs to the automata
    await Promise.all(transitions.map((t) => driver.session().run(
      `create(:Transition{ id:'${t.id}',
      state_src_id:'${t.state_src_id.id}',
      src_coord:point({x: ${t.state_src_id.x}, y: ${t.state_src_id.y}}),
      state_dst_id:'${t.state_dst_id.id}',
      dst_coord:point({x: ${t.state_dst_id.x}, y: ${t.state_dst_id.y}}),
      symbols:[${t.symbols.map((s) => json.stringify(s))}],
      coordTemp: point({x: ${t.coordTemp.x}, y: ${t.coordTemp.y}})});`
    )));
    //Creates the relations between the saved automata and his transitions
    await Promise.all(transitions.map((t) => driver.session().run(
      `match(a:Automata) , (tr:Transition) where a.id = '${id}' and tr.id = '${t.id}'
      create(a)-[:transitions]->(tr);`
    )));
    return {
      id,
      repeatedID : false,
      status : true,
    };
  } catch ( _ ) {
    return {
      id,
      repeatedID : true,
      status : false,
    };
  }
}

/**
 * Deletes an automata stored on db
 * @param {*} id
 * @returns a boolean value true if successful or false otherwise
 */
async function deleteAutomata(id) {
  try {
    if(cache.has(id)){
      cache.del(id);//Elimina el automata almacenado en cache 
    }
    const querys = [
      `match(:Automata{id:"${id}"})-[:states]->(s:State) detach delete s;`,
      `match(:Automata{id:"${id}"})-[:transitions]->(t:Transition) detach delete t;`,
      `match(:Automata{id:"${id}"})-[:alphabet]->(a:Alphabet) detach delete a;`,
    ];
    await Promise.all(querys.map((query) => driver.session().run(query)));
    await driver.session().run(`match(a:Automata{id:"${id}"}) detach delete a;`);
    return true;
  } catch (e) {
    return false;
  }
}
/**
 * 
 * @param {*} regex regex string to delete automata
 * @returns boolean if successful, false otherwise
 */
async function deleteAutomataByRegex(regex){
  try{
    const session = driver.session();
    let queryResult = await session.run(`match(n:Automata{ regex:"${regex}"}) return n.id as automataID;`)
    let automataID = queryResult.records[0].get("automataID")
    deleteAutomata(automataID);
    return true;
  }catch(_){
    return false;
  }

}
/**
 * Replace an automata stored on database with a new one with diferent values
 * @param {*} id ID of automata of replace
 * @param {*} regex regular expression associated with automata
 * @param {*} alphabet new alphabet of the automata
 * @param {*} states new list of states
 * @param {*} transitions new list of transitions
 * @returns true if successful or false otherwise
 */
async function replaceAutomata(id, regex, alphabet, states, transitions) {
  try {
    await deleteAutomata(id);
    await saveAutomata(id, regex, alphabet, states, transitions);
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = {
  getAutomata,
  listAllAutomatas,
  saveAutomata,
  deleteAutomata,
  replaceAutomata,
  deleteAutomataByRegex,
};
