const express = require('Express');
let reRouter = express.Router();
reRouter.route('/')
.get((req, res)=>{
    res.send('Hola desde re service');
})
module.exports = reRouter;