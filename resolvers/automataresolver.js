const { json } = require("neo4j-driver-core");
const { driver } = require("../db/db");

/**
 * Retrieves a single automata based on id
 * @param {*} id
 * @returns a single automata
 */
async function getAutomata(id) {
  let session = driver.session();
  let automataResult = await session.run(
    `match(a:Automata{id:"${id}"}) return a.name as name`
  );
  let stateResult = await session.run(
    `match (:Automata{id:"${id}"})-[:states]->(s:State) return s`
  );
  let alphabetResult = await session.run(
    `match (:Automata{id:"${id}"})-[:alphabet]->(a:Alphabet) return a`
  );
  let transitionResult = await session.run(
    `match (:Automata{id:"${id}"})-[:transitions]->(t:Transition) return t`
  );
  session.close();
  return {
    id,
    name: automataResult.records[0].get("name"),
    alphabet: alphabetResult.records[0].get("a").properties.symbols,
    states: stateResult.records.map((s) => s.get("s").properties),
    transitions: transitionResult.records.map((t) => {
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

/**
 * List all the automatas stored on database
 * @returns a list of automatas
 */
async function listAllAutomatas() {
  let session = driver.session();
  let idList = await session.run(`match(a:Automata) return a.id as id`);
  session.close();
  return Promise.all(idList.records.map((id) => getAutomata(id.get("id"))));
}

/**
 * Save a new automata on database
 * @param {*} id ID of automata to save
 * @param {*} name Name of automata to save
 * @param {*} alphabet List of symbols that represents the alphabet of the automata
 * @param {*} states List of states of the automata
 * @param {*} transitions List of transitions of the automata
 * @returns the automata saved on db
 */
async function saveAutomata(id, name, alphabet, states, transitions) {
  try {
    await driver
      .session()
      .run(`create(:Automata{ id : '${id}' , name:'${name}'});`);
    await driver
      .session()
      .run(
        `match(r:Repository) , (a:Automata) where r.name = 'Repo' and a.id = '${id}' create(r)-[:contains]-> (a);`
      );
    await driver
      .session()
      .run(
        `create(:Alphabet{id: 'Alp${id}', symbols:[${alphabet.map((a) =>
          json.stringify(a)
        )}]});`
      );
    await driver
      .session()
      .run(
        `match(a:Automata) , (alp:Alphabet) where a.id = '${id}' and alp.id = 'Alp${id}' create(a)-[:alphabet]->(alp);`
      );
    await Promise.all(
      states.map((s) =>
        driver
          .session()
          .run(
            `create(:State{ id:'${s.id}', name:'${s.name}' , coord:point({x: ${s.coord.x}, y: ${s.coord.y}}) ,end:${s.end}, start:${s.start}})`
          )
      )
    );
    await Promise.all(
      states.map((s) =>
        driver
          .session()
          .run(
            `match(a:Automata) , (s:State) where a.id = '${id}' and s.id = '${s.id}' create(a)-[:states]->(s);`
          )
      )
    );
    await Promise.all(
      transitions.map((t) =>
        driver
          .session()
          .run(
            `create(:Transition{ id:'${t.id}', state_src_id:'${
              t.state_src_id.id
            }', src_coord:point({x: ${t.state_src_id.x}, y: ${
              t.state_src_id.y
            }}), state_dst_id:'${t.state_dst_id.id}', dst_coord:point({x: ${
              t.state_dst_id.x
            }, y: ${t.state_dst_id.y}}), symbols:[${t.symbols.map((s) =>
              json.stringify(s)
            )}], coordTemp: point({x: ${t.coordTemp.x}, y: ${
              t.coordTemp.y
            }})});`
          )
      )
    );
    await Promise.all(
      transitions.map((t) =>
        driver
          .session()
          .run(
            `match(a:Automata) , (tr:Transition) where a.id = '${id}' and tr.id = '${t.id}' create(a)-[:transitions]->(tr);`
          )
      )
    );
    return {
      id,
      name,
      alphabet,
      states,
      transitions,
    };
  } catch (error) {
    return "An error has ocurred while saving the automata";
  }
}

/**
 * Deletes an automata stored on db
 * @param {*} id
 * @returns a boolean value true if successful or false otherwise
 */
async function deleteAutomata(id) {
  try {
    const querys = [
      `match(:Automata{id:"${id}"})-[:states]->(s:State) detach delete s;`,
      `match(:Automata{id:"${id}"})-[:transitions]->(t:Transition) detach delete t;`,
      `match(:Automata{id:"${id}"})-[:alphabet]->(a:Alphabet) detach delete a;`,
    ];
    await Promise.all(querys.map((query) => driver.session().run(query)));
    await driver
      .session()
      .run(`match(a:Automata{id:"${id}"}) detach delete a;`);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Replace an automata stored on db with a new one with diferent values
 * @param {*} id ID of automata of replace
 * @param {*} name new name of the automata
 * @param {*} alphabet new alphabet of the automata
 * @param {*} states new list of states
 * @param {*} transitions new list of transitions
 * @returns true if successful or false otherwise
 */
async function replaceAutomata(id, name, alphabet, states, transitions) {
  try {
    await deleteAutomata(id);
    await saveAutomata(id, name, alphabet, states, transitions);
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
};
