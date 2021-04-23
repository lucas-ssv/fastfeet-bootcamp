import nodemailer from 'nodemailer';
import { resolve, join } from 'path';
import express from 'express';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';

import mailConfig from '../config/mail';

const app = express();

class Mail {
    constructor() {
        const { host, port, secure, auth } = mailConfig;

        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: auth.user ? auth : null,
        });

        this.configureTemplates();
    }

    configureTemplates() {
        // const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

        // this.transporter.use('compile', nodemailerhbs({
        //     viewEngine: exphbs.create({
        //         layoutsDir: resolve(__dirname, 'layouts'),
        //         partialsDir: resolve(__dirname, 'partials'),
        //         defaultLayout: 'default',
        //         extname: '.hbs',
        //     }),
        //     viewPath,
        //     extname: '.hbs'
        // }));

        var handlebars = exphbs.create({
            layoutsDir: join(__dirname, "views/emails/layouts"),
            partialsDir: join(__dirname, "views/emails/partials"),
            defaultLayout: 'default',
            extname: 'hbs'
        });
          
        app.engine('hbs', handlebars.engine);
        app.set('view engine', 'hbs');
        app.set('views', join(__dirname, "views"));
    }

    sendMail(message) {
        return this.transporter.sendMail({
            ...mailConfig.default,
            ...message,
        });
    }
}

export default new Mail();