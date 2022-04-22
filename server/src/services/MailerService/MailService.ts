import path from "path";
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import SMTPTransport from "nodemailer/lib/smtp-transport";

// tls: { rejectUnauthorized: false }


export class MailService {
  constructor(
    public to: string | undefined,
    public from: string,
    public subject: string,
    public template: string,
    public context: Record<string,string | undefined>,

  ) {}

  sendEmail() {
    const transport = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      secure: false,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
      },
    } as SMTPTransport.Options)

    transport.use('compile', hbs({
      viewEngine: {
        defaultLayout: undefined,
        partialsDir: path.resolve('./src/resources/mail/')
      },
      viewPath: path.resolve('./src/resources/mail/'),
      extName: '.html',
    }))

    const mailOptions = {
      to: this.to,
      from: this.from,
      subject: this.subject,
      template: this.template,
      context: this.context,
    }

    console.log(mailOptions);

    transport.sendMail(mailOptions, (error, info) => {
      console.log(info)
      if (error) {
          console.log(error)
          return error;
      } else {
          return "Um e-mail de confirmação de cadastro foi enviado ao seu email";
      }
    });

  }

}