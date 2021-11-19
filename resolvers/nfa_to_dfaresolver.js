const axios = require("axios");
const { parseTransitions, parsePrologDFA } = require("../utils/prologdataadapter.js");
/*
 *
 * Description:
 * If user is lazy enough, transform an NFA into a DFA using prolog server
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
const converterURL = "http://localhost:9000/converter"

async function convertNFAtoDFA(alphabet, states, transitions){
    const NFA = {   
        value : {
            vocabulary:alphabet,
            states: states.map(( _ , index) => `s${index + 1}`),   
            initial: states.filter(({start}) => start).map(( _ , index) => `s${index + 1}`)[0],
            finals: states.filter(({end}) => end).map((state) => `s${states.indexOf(state) + 1}`),
            moves: parseTransitions(transitions, states)
        },
        type:"nfa",
    }
    const response = await axios.post(converterURL, NFA);
    return parsePrologDFA(response.data.fa);
}

module.exports = {
    convertNFAtoDFA
}