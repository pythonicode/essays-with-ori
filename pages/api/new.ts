import { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';

type Customer = {
  firstname: string;
  lastname: string;
  email: string;
  confirmEmail?: string;
  contact: string;
  phone?: string;
  terms?: boolean;
};

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function createEmail(price: number, customer: Customer, main: any, supplementals: any) {
  let html = '';
  html += `Name: ${customer.firstname} ${customer.lastname}\n`;
  html += `Email: ${customer.email}\n`;
  if (customer.phone) html += `Phone: ${customer.phone}\n`;
  html += `Preferred Contact Method: ${customer.contact}\n`;
  html += `\n`;
  if (main) {
    html += 'Main Essay\n';
    html += `Package: ${main.tier}\n`;
    html += `Link: ${main.link}\n`;
    html += '\n';
  }
  for (let i = 0; i < supplementals.length; i++) {
    html += `Supplemental Essay ${i + 1}\n`;
    html += `Package: ${supplementals[i].tier}\n`;
    html += `Link: ${supplementals[i].link}\n`;
    html += '\n';
  }
  html += `Total: ${currency.format(price)}`;
  return html;
}

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  // return response.status(200).json(request.body);
  if (!request.body) return response.status(500).json({ err: 'Request body is empty.' });
  else if (!request.body.customer)
    return response.status(500).json({ err: 'Customer form not provided.' });
  const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
      user: 'essayswithori@gmail.com',
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: 'Essays with Ori (essayswithori@gmail.com)',
    to:
      process.env.NODE_ENV == 'development' ? 'anthony.j.riley@gmail.com' : 'orianariley@gmail.com',
    subject: `🔥 New customer! ${request.body.customer.firstname} ${request.body.customer.lastname} (${request.body.customer.email})`, // subject line
    text: createEmail(
      request.body.price,
      request.body.customer,
      request.body.main,
      request.body.supplementals
    ),
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
