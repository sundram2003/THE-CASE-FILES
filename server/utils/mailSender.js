import { google } from "googleapis";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const hostEmail = process.env.HOST_EMAIL;
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  REDIRECT_URI
);
console.log("print process.env", process.env.CLIENT_ID, process.env.CLIENT_SECRET, REDIRECT_URI);
// console.log("oAuth2client details: ", oAuth2Client)
const REFRESH_TOKEN = (process.env.REFRESH_TOKEN);
console.log("Refresh token", REFRESH_TOKEN);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
console.log("oAuth2Client credentials set");
export const mailSender = async (email, title, body) => {
  try {
    console.log("Before fetching accesstokens");
    const accessToken = await oAuth2Client.getAccessToken();
    // console.log(accessToken)
    const transport = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "sundram.smn@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: hostEmail,
      to: email,
      subject: title,
      // text: `${body}`,
      html: body,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};