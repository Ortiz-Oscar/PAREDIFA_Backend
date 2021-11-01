const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLBoolean } = require('graphql');
const {automataType} = require('../models/automata');
const nodemailer = require("nodemailer");
const { getAutomata, listAllAutomatas, saveAutomata } = require('../config/automataCRUD');
const { inputStateType } = require('../models/inputs/stateInput')
const { inputTransitionType } = require('../models/inputs/transitionInput');
const automataQuery = new GraphQLObjectType({
    name:'Automata_query',
    fields:()=>({
        singleAutomata:{
            type:automataType,
            description:'Returns a single automata based on id',
            args:{
                id:{type:GraphQLString}
            },
            resolve: (_, args)=>{
                return getAutomata(args.id)
            }
        },
        allAutomatas:{
            type:GraphQLList(automataType),
            description:'Returns a list of all automatas saved',
            resolve: ()=> listAllAutomatas(),
        },
        sendAutomata:{
            type:GraphQLString,
            description:'Sends an email with an image of the automata in base64 to an email direction',
            args:{
                mailAddres:{type:GraphQLString},
                imageData:{type:GraphQLString}
            },
            resolve: async(_, args) => {
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                      user: "eif400paredifag01@gmail.com", // generated ethereal user
                      pass: "zvpanjdszgbntcfi", // generated ethereal password
                    },
                  });
                
                  // send mail with defined transport object
                  let info = await transporter.sendMail({
                    from: 'eif400paredifag01@gmail.com', // sender address
                    to: args.mailAddres, // reciever
                    subject: "Your automata made in PAREDIFA", // Subject line
                    html: `<p>Your automata made in our application</p>`, // html body
                    attachments:[
                      {
                          filename: "Automata.png",
                          path: args.imageData
                      }
                    ]
                  });
                  transporter.close();
                  return info.messageId
            }
        }

    })
});
const automataMutation = new GraphQLObjectType({
    name:'Automata_mutation',
    description:'Write a new automata on database',
    fields:()=>({
        saveAutomata : {
            type : automataType,
            description:'Save a new automata to database',
            args:{
                id : { type:GraphQLString },
                alphabet : { type:GraphQLList(GraphQLString) },
                states: { type:GraphQLList(inputStateType) },
                transitions: {type:GraphQLList(inputTransitionType)}
            },
            resolve:( _ , args ) => saveAutomata(args.id, args.alphabet, args.states, args.transitions),
        }
    })
});
const automataSchema = new GraphQLSchema({
    query: automataQuery,
    mutation: automataMutation
})
module.exports = {
    automataSchema
}