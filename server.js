const express = require('express');
const bodyParser = require('body-parser');

const apiKey = '84caa7a68038223b09149d67efa4bc3e';
const domain = 'sandbox7d0b00c0c05d473f9d7bae4f0abf20c3.mailgun.org';

const mailgun = require('mailgun-js');
const mailgunMsg = mailgun({ apiKey: apiKey, domain: domain });

const myApp = express();

myApp.use(bodyParser.urlencoded({ extended: true }));
myApp.use(express.static('public/css'));

myApp.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

myApp.post('/', (req, res) => {
    const email = req.body.email;
    console.log(email);

    const data = {
        from: 'Ansh <ansh4763.be23@chitkara.edu.in>',
        to: email,
        subject: 'Welcome',
        text: 'We welcome you here ',
    };

    mailgunMsg.messages().send(data, (error, body) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error Detected.');
        }
        console.log('Email sent successfully:', body);

    });
});

myApp.listen(3400, () => {
    console.log('Server is running at port 7800.');
});
