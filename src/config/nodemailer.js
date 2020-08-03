import 'dotenv/config';
import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';
import sendMailQueue from './bull';
import logger from './logger';

const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'E-commerce',
        link: 'http://localhost:3000/'
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_PASSWORD
    }
});

const option = (email, subject, html) => {
    const mailOptions = {
        from: `"E-commerce"<${process.env.NODE_MAILER_EMAIL}>`,
        to: email,
        subject,
        html
    };
    return mailOptions;
};

const sendmail = (mailOptions) => new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            reject(error);
        } else {
            resolve(info.response);
        }
    });
});

const options = {
    attempts: 2
};

async function signupMail(email, first_name, token) {
    const mail = await mailGenerator.generate({
        body: {
            name: first_name,
            intro: 'Welocome to E-commerce',
            action: {
                instructions: `Please confirm your email address by clicking on the link below.
                We'll communicate with you from time to time via email so it's important that we have an up-to-date email address on file
                `,
                button: {
                    color: '#22BC66',
                    text: 'Confrim your account',
                    link: `http://localhost:3000/api/v1/auth/confirmation?token=${token}`
                }
            }
        }
    });
    await transporter;
    /* Producers.
    // A job producer is simply some Node program that adds jobs to a queue, */
    const data = await option(email, 'signup sucessful', mail);
    sendMailQueue.add(data, options);
}

async function verifyMail(email, first_name, token) {
    const mail = await mailGenerator.generate({
        body: {
            name: first_name,
            intro: 'Welocome to E-commerce',
            action: {
                instructions: `Please confirm your email address by clicking on the link below.
                We'll communicate with you from time to time via email so it's important that we have an up-to-date email address on file
                `,
                button: {
                    color: '#22BC66',
                    text: 'Confrim your account',
                    link: `http://localhost:3000/api/v1/auth/confirmation?token=${token}`
                }
            }
        }
    });
    await transporter;
    const data = await option(email, 'Verify Your email', mail);
    sendMailQueue.add(data, options);
}

async function forgetPasswordMail(first_name, email, token) {
    const mail = await mailGenerator.generate({
        body: {
            name: first_name,
            intro: 'You have received this email because a password reset request for your account was received.',
            action: {
                instructions: 'Click the button below to reset your password:',
                button: {
                    color: '#DC4D2F',
                    text: 'Rest your Password',
                    link: `http://localhost:3000/api/v1/auth/reset-password?token=${token}`
                }
            }
        }
    });
    await transporter;
    const data = await option(email, 'Rest Password', mail);
    sendMailQueue.add(data, options);
}

async function welcomeMail(first_name, email) {
    const mail = await mailGenerator.generate({
        body: {
            name: first_name,
            intro: 'Your account has been activated'
        }
    });
    await transporter;
    const data = await option(email, 'Welcome', mail);
    sendMailQueue.add(data, options);
}

async function resetSuccessful(first_name, email) {
    const mail = await mailGenerator.generate({
        body: {
            name: first_name,
            intro: 'Your password has been Reset successfully'
        }
    });
    await transporter;
    const data = await option(email, 'Reset Successful', mail);
    sendMailQueue.add(data, options);
}

// consumer
sendMailQueue.process(async(job) => {
    const respo = await sendmail(job.data);
    console.log(respo);
    return respo;
});

export default {
    signupMail,
    forgetPasswordMail,
    welcomeMail,
    resetSuccessful,
    verifyMail
};
