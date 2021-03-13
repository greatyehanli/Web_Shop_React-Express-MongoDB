const nodemailer = require('nodemailer')

const sendEmail = function(dataObject){
    const trans = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    }) 

    const setting = {
        from: process.env.EMAIL_FROM,
        to: dataObject.to,
        subject: dataObject.subject,
        html: dataObject.html
    }

    trans.sendMail(setting, (err, info)=>{
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
    })
}

module.exports = sendEmail