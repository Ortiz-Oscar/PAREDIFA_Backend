const axios = require("axios");
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
  const prologEndPoint = re.simpBeforeComp ? "http://localhost:9000/simplifier" 
                                           : "http://localhost:9000/compiler";
  const regularExpression = { value: re.RE, type: "regex" };//Object that is to be sent
  let response = await axios.post(prologEndPoint, regularExpression);
  let finiteAutomata = response.data.fa;
  return {
    nodes: finiteAutomata.states.map((state, index) => ({
      name: index,
      label: `S${index}`,
      initial: finiteAutomata.initial === state,
      final: finiteAutomata.finals.some((final) => final === state),
    })),
    edges: finiteAutomata.moves.map((move) => {
      let parsedMove =  move.split('==>').flatMap(i => i.split("/"));
      const movementSource = finiteAutomata.states.indexOf(parsedMove[0]);
      const movementTarget = finiteAutomata.states.indexOf(parsedMove[2]);
      return ({
        source: movementSource,
        target: movementTarget,
        symbol: parsedMove[1],
      })
  }),
    alphabet: finiteAutomata.vocabulary,
  };
}
module.exports = {
  compileRE,
};
