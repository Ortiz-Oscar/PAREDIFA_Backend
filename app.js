const express = require('Express');
const { graphqlHTTP,  } = require('express-graphql');
const {automataSchema} = require('./schemas/automata-schema')
const {saveAutomata} = require('./config/automataCRUD');
const app = express();
const port = 3001;

app.get('/' , (_,res)=>{
    res.send(`<h1>Server running on port ${port}</h1>`);
});
app.use('/gql', graphqlHTTP({ schema:automataSchema ,graphiql:true}));
app.listen(port,()=>console.log(`Server running on port ${port}`));