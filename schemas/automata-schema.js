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
                binaryInfo: { type: GraphQLString },
                studentName: { type: GraphQLString },
                studentId: { type: GraphQLString },
                studentSchedule: { type: GraphQLString },
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
                  const COURSE = {
                    code: "400",
                    subject: "HOMEWORK",
                    year: "2020",
                    cycle: "||",
                  };
                  const DESCRIPTION = `EIF${COURSE.code}_${COURSE.subject}_${COURSE.cycle}_${COURSE.year}_${args.studentName}_${args.studentId}_${args.studentSchedule}`;
                  let info = await transporter.sendMail({
                    from: 'eif400paredifag01@gmail.com', // sender address
                    to: args.mailAddres, // reciever
                    subject: DESCRIPTION, // Subject line
                    html: `<h3>Greetings, ${args.studentName}</h3><br></br>
                    <p>Hope you're doing well, this email is to inform you that you have recieved an automata  \u{270D}\u{1F4DA}</p><br></br>
                    <br></br>
                    <p>Regards, </p><br></br>
                    <strong>PAREDIFA 01-10 Team</strong>
                    `,
                    attachments:[
                      {
                          filename: `${DESCRIPTION}.png`,
                          path: args.binaryInfo
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