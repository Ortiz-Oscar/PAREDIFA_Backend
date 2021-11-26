/*
 *
 * Description:
 * Data parsing from prolog to client and viceverse
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
/**
 * 
 * @param {*} finiteAutomata response object from prolog server
 * @returns a list of processed states that are used in client for layout purposes
 */
function parsePrologStates(finiteAutomata){
    return finiteAutomata.states.map((state, index) => ({
        name: index,
        label: `S${index}`,
        initial: finiteAutomata.initial === state,
        final: finiteAutomata.finals.some((final) => final === state),
      }));
}
/**
 * 
 * @param {*} finiteAutomata response object from prolog server
 * @returns a list of transitions that are not unified
 */
function parsePrologTransitions(finiteAutomata){
    return finiteAutomata.moves.map((move) => {
        let parsedMove =  move.split('==>').flatMap(i => i.split("/"));
        const movementSource = finiteAutomata.states.indexOf(parsedMove[0]);
        const movementTarget = finiteAutomata.states.indexOf(parsedMove[2]);
        return ({
          source: movementSource,
          target: movementTarget,
          symbol: parsedMove[1],
        })
    })
}
/**
 * 
 * @param {*} edges processed transitions
 * @returns a list of processed transitions that are sent to client for layout purposes
 */
function unifyMoves(edges){
    let visitedEdges = [];//Store processed transitions
    return edges.reduce((acc, currentEdge) => {
        if(!visitedEdges.some(coord => coord.source === currentEdge.source && coord.target === currentEdge.target)){
          let unifiedSymbols = (edges.filter(e => e.source === currentEdge.source && e.target === currentEdge.target)
                               .map(edge => edge.symbol)).join();
          currentEdge.symbol = unifiedSymbols;
          visitedEdges.push( ({source:currentEdge.source, target:currentEdge.target}) );
          return [...acc,currentEdge]
        }
        return [...acc];
      }, [])
}
/**
 * 
 * @param {*} transitions client type transitions
 * @param {*} states client type states
 * @returns a list of prolog transition strings
 */
function parseTransitions(transitions, states){
    return transitions.flatMap(({ state_src_id, state_dst_id, symbols}) => {
        const source = states.find(s => s.id === state_src_id.id);
        const sourceIndex = states.indexOf(source);
        const target = states.find(s => s.id === state_dst_id.id);
        const targetIndex = states.indexOf(target);
        return symbols.map(symbol => `s${ sourceIndex + 1 }/${symbol}==>s${ targetIndex + 1 }`);
    });
}
/**
 * Handle parsing of prolog DFA into a layout DFA
 * @param {*} finiteAutomata prolog automata type
 * @returns a layout automata object
 */
function parsePrologDFA(finiteAutomata){
    //Parse states
    const processedNodes = parsePrologStates(finiteAutomata);
    //Format to transitions
    let edges = parsePrologTransitions(finiteAutomata);
    //Unify symbols of transitions from same source and target 
    const processedEdges = unifyMoves(edges)
    return { //Object that is to be returned
        nodes: processedNodes,
        edges: processedEdges,
        alphabet: finiteAutomata.vocabulary,
    }
}
module.exports = {
    parsePrologDFA,
    parseTransitions
}