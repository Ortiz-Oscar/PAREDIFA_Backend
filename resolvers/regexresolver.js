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
  try{
    let response = await axios.post(prologEndPoint, regularExpression);
    let finiteAutomata = response.data.fa;
  
    const processedNodes = finiteAutomata.states.map((state, index) => ({
      name: index,
      label: `S${index}`,
      initial: finiteAutomata.initial === state,
      final: finiteAutomata.finals.some((final) => final === state),
    }));
  
    //Procesa los movimientos que vienen del servidor
    let edges = finiteAutomata.moves.map((move) => {
      let parsedMove =  move.split('==>').flatMap(i => i.split("/"));
      const movementSource = finiteAutomata.states.indexOf(parsedMove[0]);
      const movementTarget = finiteAutomata.states.indexOf(parsedMove[2]);
      return ({
        source: movementSource,
        target: movementTarget,
        symbol: parsedMove[1],
      })
    })
  
    //Almacena los movimientos procesados para no volver a hacerlo
    let visitedEdges = [];
    
    //Unifica los simbolos de los movimientos de un mismo source y target
    const processedEdges = edges.reduce((acc, currentEdge) => {
      if(!visitedEdges.some(coord => coord.source === currentEdge.source && coord.target === currentEdge.target)){
        let unifiedSymbols = (edges.filter(e => e.source === currentEdge.source && e.target === currentEdge.target)
                             .map(edge => edge.symbol)).join();
        currentEdge.symbol = unifiedSymbols;
        visitedEdges.push( ({source:currentEdge.source, target:currentEdge.target}) );
        return [...acc,currentEdge]
      }
      return [...acc];
    }, [])
    return {
      nodes: processedNodes,
      edges: processedEdges,
      alphabet: finiteAutomata.vocabulary,
    };

  }catch(e){
    return e
  }
}
module.exports = {
  compileRE,
};
