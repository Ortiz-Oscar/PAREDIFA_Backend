const axios = require("axios");
const cache = require("../utils/cachemanager.js")
const { parsePrologDFA } = require("../utils/prologdataadapter.js")
/*
 *
 * Description:
 * Handle regex querys on prolog server
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */

/**
 * @description Compiles a regular expression into a determistic finite automata automata
 * @param {*} re Object that represents the regular expression
 * @returns a new automata object 
 */
async function compileRE(re) {
  const prologEndPoint = re.simpBeforeComp ? process.env.prologSimplifier
                                           : process.env.prologCompiler;
  const regularExpression = { value: re.RE, type: "regex" }; //Object that is to be sent
  const cacheKey = [re.RE, re.simpBeforeComp].join(); //Cache key to check if regex is stored on cache
  if(cache.has(cacheKey)){ //Check if automata is stored on cache
    return cache.get(cacheKey);
  }
  try{
    let response = await axios.post(prologEndPoint, regularExpression);
    let finiteAutomata = response.data.fa;
    const DFA = parsePrologDFA(finiteAutomata);
    cache.set(cacheKey, DFA);//Save DFA in cache for later requests
    return DFA;
  }catch(e){
    return e
  }
}
module.exports = {
  compileRE,
};
