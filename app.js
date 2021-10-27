const express = require('Express');
const { graphqlHTTP,  } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLString } = require('graphql');
const {automataType} = require('./models/automata')
let { getAutomata, listAllAutomatas } = require('./config/automataCRUD');
const app = express();

const automataService = require('./routes/automataService');
const reService = require('./routes/regularExpressionService')
const port = 3001;
const automataQuery = new GraphQLObjectType({
    name:'Automata_query',
    fields:()=>({
        singleAutomata:{
            type:automataType,
            description:'Returns a single automata based on id',
            args:{
                id:{type:GraphQLString}
            },
            resolve: (parent, args)=>{
                return getAutomata(args.id)
            }
        },
        allAutomatas:{
            type:GraphQLList(automataType),
            description:'Returns a list of all automatas saved',
            resolve: ()=> listAllAutomatas(),
        }
    })
})


const automataSchema = new GraphQLSchema({
    query: automataQuery
})

app.get('/' , (req,res)=>{
    res.send('Pagina principal')
});
app.use('/gql', graphqlHTTP({ schema:automataSchema ,graphiql:true}));
//app.use('/automatas',automataService);
//app.use('/re',reService)
app.listen(port,()=>console.log('Server running'));