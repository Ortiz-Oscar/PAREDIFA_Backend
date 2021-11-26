const nodemailer = require("nodemailer");
/*
 *
 * Description:
 * Mail sender function
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
/**
 * 
 * @param {*} args 
 * @returns output of mailsender js
 */
async function sendImage(args) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.emailUser, // generated ethereal user
      pass: process.env.emailPassword, // generated ethereal password
    },
  });
  // send mail with defined transport object
  const COURSE = {
    code: "400",
    subject: "HOMEWORK",
    year: "2020",
    cycle: "II",
  };
  const DESCRIPTION = `EIF${COURSE.code}_${COURSE.subject}_${COURSE.cycle}_${COURSE.year}_${args.studentName}_${args.studentId}_${args.studentSchedule}`;
  let info = await transporter.sendMail({
    from: process.env.emailUser, // sender address
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
module.exports = { sendImage };