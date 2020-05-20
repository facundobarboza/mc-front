// const functions = require('firebase-functions');

// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);

// const SENDGRID_API_KEY = functions.config().sendgrid.key;

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(SENDGRID_API_KEY);

// exports.sendOrder = functions.firestore.document('orders/{id}').onCreate((snap: any, context: any) => {
//     // const email = snap.data().email;
//     // const name = snap.data().name;

//     console.log('snap', snap);
//     console.log('snap.data', snap.data);

//     // const email = 'no-reply@deliveryplus.com.ar';
//     const email = 'facubarza@gmail.com';
//     const nameAdmin = 'Matias';

//     const msg = {
//         to: 'facundodbarboza@gmail.com',
//         from: email,
//         subject: 'Nuevo pedido',

//         // custom template
//         templateId: 'd-8855b5f7de564e77b3f76c0eb09a2c52',
//         substitutionWrappers: ['{{', '}}'],
//         subtitutions: {
//             name: nameAdmin
//             // other custum properties
//         }
//     };

//     return sgMail.send(msg);
// });



import * as functions from 'firebase-functions';

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'facubarza@gmail.com',
        pass: 'gmail.boca.4'
    }
});

exports.sendOrder = functions.firestore.document('orders/{id}').onCreate((snap: any, context: any) => {
    // const email = snap.data().email;
    // const name = snap.data().name;
    const email = 'facundo.barboza@outlook.com';
    const name = 'Facundo';
    return sendEmail(email, name);
});

// envio de email

function sendEmail(email: string, name: string) {
    return transport.sendMail({
        from: 'App',
        to: email,
        subject: 'Nuevo pedido',
        html: `
            <h1>Hola ${name}</h1>
            <p>Mensaje de prueba</p>
        `
    })
        .then((response: any) => response)
        .catch((error: any) => error);
};


// import * as functions from 'firebase-functions';

// const nodemailer = require("nodemailer");

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// const transport = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'facubarza@gmail.com',
//         pass: 'gmail.boca.4'
//     }
// });

// exports.welcomeMail = functions.firestore.document('orders/{id}').onCreate((snap: any, context: any) => {
//     // const email = snap.data().email;
//     // const name = snap.data().name;
//     const email = 'facundo.barboza@outlook.com';
//     const name = 'Facundo';
//     return sendEmail(email, name);
// });

// // envio de email

// function sendEmail(email: string, name: string) {
//     return transport.sendMail({
//         from: 'Facundo <no-reply@deliveryplus.com.ar>',
//         to: email,
//         subject: 'Nuevo pedido',
//         html: `
//             <h1>Hola ${name}</h1>
//             <p>Mensaje de prueba</p>
//         `
//     })
//         .then((response: any) => response)
//         .catch((error: any) => error);
// };