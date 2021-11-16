const axios = require("axios");
const prologURL = "http://localhost:9000/compiler";
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
 * @description Compiles a regular expression into a automata
 * @param {*} re Object that represents the regular expression
 * @returns a new automata object 
 */
async function compileRE(re) {
  const regularExpression = { value: re, type: "regex" };
  let response = await axios.post(prologURL, regularExpression);
  let finiteAutomata = response.data.fa;
  return {
    nodes: finiteAutomata.states.map((state) => ({
      name: parseInt(state[1]),
      label: state,
      initial: finiteAutomata.initial === state,
      final: finiteAutomata.finals.some((final) => final === state),
    })),
    edges: finiteAutomata.moves.map((move) => ({
      source: parseInt(move[1]),
      target: parseInt(move[8]),
      symbol: move[3],
    })),
    alphabet: finiteAutomata.vocabulary,
  };
}
module.exports = {
  compileRE,
};
