const express = require('Express');
const { graphqlHTTP,  } = require('express-graphql');
const {automataSchema} = require('./schemas/automata-schema')
const {saveAutomata} = require('./config/automataCRUD');
const app = express();
const port = 3001;

app.get('/' , (req,res)=>{
    //res.send('Pagina principal')
    saveAutomata(1,['0','1'],[
        {"id":1635026207553,"name":"S0","coord":{"x":326,"y":185},"radius":20,"end":false,"start":true}
       ,{"id":1635026207935,"name":"S1","coord":{"x":700,"y":105},"radius":20,"end":true,"start":false}
       ,{"id":1635026209193,"name":"S2","coord":{"x":662,"y":330},"radius":20,"end":false,"start":false}],
       [
        {"id":1635026217885,"state_src_id":1635026207553,"state_dst_id":1635026207553,"symbols":["0"]}
       ,{"id":1635026221915,"state_src_id":1635026207553,"state_dst_id":1635026207935,"symbols":["1"]}
       ,{"id":1635026225366,"state_src_id":1635026207935,"state_dst_id":1635026207935,"symbols":["1"]}
       ,{"id":1635026229271,"state_src_id":1635026207935,"state_dst_id":1635026209193,"symbols":["0"]}
       ,{"id":1635026251272,"state_src_id":1635026209193,"state_dst_id":1635026209193,"symbols":["0","1"]}]
       ).then(res1 => res.send(res1));
});
app.use('/gql', graphqlHTTP({ schema:automataSchema ,graphiql:true}));
//app.use('/automatas',automataService);
//app.use('/re',reService)
app.listen(port,()=>console.log(`Server running on port ${port}`));