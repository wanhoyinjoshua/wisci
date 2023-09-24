import * as AWS from "aws-sdk";
import * as nodemailer from "nodemailer";
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-southeast-2",
});
AWS.config.getCredentials(function (error) {
    if (error) {
        console.log(error.stack);
    }
});
const ses = new AWS.SES({ apiVersion: "2010-12-01" });

// change this to the "to" email that you want
const adminMail = "wisci.org";
// Create a transporter of nodemailer
const transporter = nodemailer.createTransport({
    SES: ses,
});
export const testMail = async (userEmail,message,subject) => {
try {
const response = await transporter.sendMail({
from: "results@wisci.org",
to: userEmail,
subject: subject,
html: message,
});
console.log(response)
return response?.messageId
? { ok: true,msg:'success' }
: { ok: false, msg: "Failed to send email" };
} catch (error) {
console.log("ERROR", error);
return { ok: false, msg: "Failed to send email" };
}
};