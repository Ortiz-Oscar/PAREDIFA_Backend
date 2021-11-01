const nodemailer = require("nodemailer");
async function sendImage(req , res){
   
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "skagro87@gmail.com", // generated ethereal user
            pass: "", // generated ethereal password
          },
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: 'skagro87@gmail.com', // sender address
          to: "skagro87@gmail.com", // list of receivers
          subject: "Puto el que lo lea", // Subject line
          text: "Hello world?", // plain text body
          html: `<b style="color:red">Hello world?!</b>`, // html body
          attachments:[
            {
                filename: "image.png",
                path: req.body.file
            }
          ]
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
      
    res.status(200).json({message:'sapo'})
}
module.exports = sendImage;