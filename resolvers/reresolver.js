const axios = require("axios");

const prologURL = "http://localhost:9000/compiler";
async function compileRE(re) {
  const regularExpression = { value: re, type: "regex" };
  let response = await axios.post(prologURL, regularExpression);
  let finiteAutomata = response.data.fa;
  console.log(finiteAutomata);
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
