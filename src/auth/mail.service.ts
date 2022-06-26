/* import nodemailer from 'nodemailer';

 class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.HOST_MAIL,
            port: process.env.PORT_MAIL,
            secure: false,
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

    }
    async sendActivationMail(username, email, confirmationCode) {
        const mailOptions = {
            from: process.env.MY_EMAIL,
            to: email,
            subject: 'confirm your account',
            html: `
            <h1>hello ${username}</h1>
            <p>For virification please click on link <a href= http://localhost:8000/api/activate/${confirmationCode}>ссылка</a></p>
            `
        };
        await this.transporter.sendMail(mailOptions);

    }
}

export default new MailService(); */