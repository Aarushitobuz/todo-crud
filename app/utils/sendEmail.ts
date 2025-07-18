import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
    },
});
export default async function sendEmail(to: string, subject: string, html: string) {
    await transporter.sendMail({
        from: `"Task App" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });
}
