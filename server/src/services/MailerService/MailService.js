"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const path_1 = __importDefault(require("path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
// tls: { rejectUnauthorized: false }
class MailService {
    constructor(to, from, subject, template, context) {
        this.to = to;
        this.from = from;
        this.subject = subject;
        this.template = template;
        this.context = context;
    }
    sendEmail() {
        const transport = nodemailer_1.default.createTransport({
            host: process.env.MAILER_HOST,
            port: process.env.MAILER_PORT,
            secure: false,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASSWORD,
            },
        });
        transport.use('compile', (0, nodemailer_express_handlebars_1.default)({
            viewEngine: {
                defaultLayout: undefined,
                partialsDir: path_1.default.resolve('./src/resources/mail/')
            },
            viewPath: path_1.default.resolve('./src/resources/mail/'),
            extName: '.html',
        }));
        const mailOptions = {
            to: this.to,
            from: this.from,
            subject: this.subject,
            template: this.template,
            context: this.context,
        };
        console.log(mailOptions);
        transport.sendMail(mailOptions, (error, info) => {
            console.log(info);
            if (error) {
                console.log(error);
                return error;
            }
            else {
                return "Um e-mail de confirmação de cadastro foi enviado ao seu email";
            }
        });
    }
}
exports.MailService = MailService;
