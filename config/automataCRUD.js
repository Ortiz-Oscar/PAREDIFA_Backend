const { json } = require('neo4j-driver-core');
const {driver} = require('./db')

async function getAutomata(id){
    let session = driver.session();
    let stateResult = await session.run(`match (:Automata{id:"${id}"})-[:states]->(s:State) return s`);
    let alphabetResult = await session.run(`match (:Automata{id:"${id}"})-[:alphabet]->(a:Alphabet) return a`);
    let transitionResult = await session.run(`match (:Automata{id:"${id}"})-[:transitions]->(t:Transition) return t`);
    session.close()
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
    let session = driver.session();
    let idList = await session.run(`match(a:Automata) return a.id as id`);
    session.close();
    return Promise.all(idList.records.map(id => getAutomata(id.get('id'))))
}

async function saveAutomata(id, alphabet, states, transitions){
    //Crea el automata y su relación con el repositorio
    //La vara es que debe respetar el orden sino la palma
    try{
        await driver.session().run(`create(:Automata{ id : '${id}' , name:'Aut'});`);
        await driver.session().run(`match(r:Repository) , (a:Automata) where r.name = 'Repo' and a.id = '${id}' create(r)-[:contains]-> (a);`)
        await driver.session().run(`create(:Alphabet{id: 'Alp${id}', symbols:[${alphabet.map(a => json.stringify(a))}]});`);
        await driver.session().run(`match(a:Automata) , (alp:Alphabet) where a.id = '${id}' and alp.id = 'Alp${id}' create(a)-[:alphabet]->(alp);`)
        await Promise.all(states.map(s => driver.session().run(`create(:State{ id:'${s.id}', name:'${s.name}' , coord:['${s.coord.x}','${s.coord.y}'], radius:'20',end:${s.end}, start:${s.start}})`,{})))
        await Promise.all(states.map(s => driver.session().run(`match(a:Automata) , (s:State) where a.id = '${id}' and s.id = '${s.id}' create(a)-[:states]->(s);`,{})))
        await Promise.all(transitions.map(t => driver.session().run(`create(:Transition{ id:'${t.id}', state_src_id:'${t.state_src_id}', state_dst_id:'${t.state_dst_id}', symbols:[${t.symbols.map(s => json.stringify(s))}]});`)))
        await Promise.all(transitions.map(t => driver.session().run(`match(a:Automata) , (tr:Transition) where a.id = '${id}' and tr.id = '${t.id}' create(a)-[:transitions]->(tr);`)))
        return {
            id,
            alphabet,
            states,
            transitions
        };
    }catch(error){
        return "An error has ocurred while saving the automata";
    }
}
module.exports = { getAutomata, listAllAutomatas, saveAutomata };