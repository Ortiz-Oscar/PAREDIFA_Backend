const NodeCache = require( "node-cache" );
/*
 *
 * Description:
 * Global cache manager, store data for caching purposes
 * Account data
 * Mail adress: eif400paredifag01@gmail.com
 * Password: PAREDIFAPROJECT
 * EIF400 -- Paradigmas de Programacion
 * @since II Term - 2021
 * @authors Team 01-10am
 *  - Andres Alvarez Duran 117520958 
 *  - Joaquin Barrientos Monge 117440348
 *  - Oscar Ortiz Chavarria 208260347
 *  - David Zarate Marin 116770797
 */
const cache = new NodeCache();
module.exports = cache;