import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const sendVerificationEmail = async (email, token) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT_SECURE,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });

    // compile the mail template
    const template = fs.readFileSync(
      path.resolve(__dirname, '../templates/mail/verificationMail.html'),
      'utf-8'
    );
    const verificationLink = process.env.API_URL + 'auth/register/verification/' + token;
    console.log(verificationLink);

    const compiledTemp = handlebars.compile(template);

    const html = compiledTemp({ verificationLink });

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: email,
      subject: 'Verify your Email',
      html: html,
    };

    const inf = await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('mail sent');
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};
