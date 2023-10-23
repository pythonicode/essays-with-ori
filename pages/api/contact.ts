import { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (!request.body) return response.status(500).json({ err: 'Request body is empty.' });
  if (!request.body.sender) return response.status(500).json({ err: 'Sender not provided.' });
  if (!request.body.sender.firstname) { return response.status(500).json({ err: 'Sender first name not provided.' }); }
  if (!request.body.sender.lastname) { return response.status(500).json({ err: 'Sender last name not provided.' }); }
  if (!request.body.sender.email) { return response.status(500).json({ err: 'Sender email not provided.' }); }
  if (!request.body.subject) { return response.status(500).json({ err: 'Subject not provided.' }); }
  const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: 'Essays with Ori (essayswithori@gmail.com)',
    to:
      process.env.NODE_ENV == 'development' ? process.env.TO_EMAIL_DEV : process.env.TO_EMAIL_PROD,
    subject: `📩 Message from ${request.body.sender.firstname} ${request.body.sender.lastname} (${request.body.sender.email}): ${request.body.subject}`, // subject line
    text: request.body.message, // plain text body
  });
  response.status(200).json({
    status: info.accepted
      ? 'success'
      : info.pending
        ? 'pending'
        : info.rejected
          ? 'rejected'
          : 'unknown',
  });
}
