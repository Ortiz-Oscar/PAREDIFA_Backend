const neo4j = require('neo4j-driver');
const driver = neo4j.driver('neo4j+s://6da34b2b.databases.neo4j.io',
                  neo4j.auth.basic('neo4j', '4ffg2SxnVRGoeoWxTV0f5qOaJlyiS9EovA4GIvQPGEA'), 
                  {/* encrypted: 'ENCRYPTION_OFF' */});
async function getAutomata(id){
    let session = driver.session({database:"neo4j"});
    const params = {};
    let stateQuery = `match (:Automata{id:"${id}"})-[:stateList]->(:StateList)-[:has]->(s:State) return s`
    let alphabetQuery = `match (:Automata{id:"${id}"})-[:alphabet]->(a:Alphabet) return a`;
    let transitionsQuery = `match (:Automata{id:"${id}"})-[:transitionList]->(:TransitionList)-[:has]->(t:Transition) return t`;
    let stateResult = await session.run(stateQuery, params);
    let alphabetResult = await session.run(alphabetQuery,params);
    let transitionResult = await session.run(transitionsQuery,params);
    return {
        id:id,
        alphabet:alphabetResult.records[0].get('a').properties.symbols,
        states: stateResult.records.map(s => {
            let state = s.get('s').properties;
            state.coord = { x:state.coord[0],y:state.coord[1]}
            return state;
        }),
        transitions:transitionResult.records.map(t => t.get('t').properties)
    }
}
async function listAllAutomatas(){
    let session = driver.session({database:"neo4j"});
    const params = {}
    const idQuery = `match(a:Automata) return a.id as id`;
    let idList = await session.run(idQuery,params);
    return Promise.all(idList.records.map(id => getAutomata(id.get('id'))))
}
module.exports = { getAutomata, listAllAutomatas };

/*
    Usuario neo4j
    password 4ffg2SxnVRGoeoWxTV0f5qOaJlyiS9EovA4GIvQPGEA
*/