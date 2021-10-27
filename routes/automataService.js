const express = require('Express');
const expressGraphQL = require('express-graphql');
let automataRouter = express.Router();
automataRouter.route('/automataQL')
.get((req, res)=>{
    res.send('Hola desde automata service');
})


module.exports = automataRouter;