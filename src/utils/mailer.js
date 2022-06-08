import nodeMailer from "nodemailer";
import mailConfig from "../configs/connectMail";
require("dotenv").config();

exports.sendMail = (to, Object, htmlContent){
    const transport = nodeMailer.createTransport({
        host: mailConfig.HOST,
        port: mailConfig.PORT,
        secure: false,
        auth: {
            user: mailConfig.USERNAME,
            pass: mailConfig.PASSWORD,
        }
    })

    const options = {
        from: mailConfig.FROM_ADDRESS,
        to: to,
        subject: subject,
        html: htmlContent
    }
    return transport.sendMail(options);
}
