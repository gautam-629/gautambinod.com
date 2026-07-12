import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    ...options,
  });
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  message: string;
  service?: string;
  budget?: string;
}): Promise<void> {
  await sendEmail({
    to: process.env.ADMIN_EMAIL!,
    subject: `New Contact Message from ${data.name}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.service ? `<p><strong>Service:</strong> ${data.service}</p>` : ""}
      ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });
}

export async function sendOrderConfirmation(data: {
  customerName: string;
  customerEmail: string;
  productName: string;
  orderNumber: string;
  amount: number;
  currency: string;
}): Promise<void> {
  await sendEmail({
    to: data.customerEmail,
    subject: `Order Confirmation - ${data.orderNumber}`,
    html: `
      <h2>Thank you for your purchase!</h2>
      <p>Hi ${data.customerName},</p>
      <p>Your order has been confirmed.</p>
      <p><strong>Order Number:</strong> ${data.orderNumber}</p>
      <p><strong>Product:</strong> ${data.productName}</p>
      <p><strong>Amount:</strong> ${data.currency} ${data.amount}</p>
      <p>We'll get in touch shortly to deliver your product.</p>
    `,
  });
}

export async function sendNewsletterConfirmation(email: string, name?: string): Promise<void> {
  await sendEmail({
    to: email,
    subject: "Welcome to the Newsletter!",
    html: `
      <h2>You're subscribed!</h2>
      <p>Hi ${name || "there"},</p>
      <p>Thank you for subscribing to our newsletter. You'll receive updates about new projects, products, and blog posts.</p>
    `,
  });
}

export async function sendProjectRequestNotification(data: {
  name: string;
  email: string;
  projectType: string;
  description: string;
  title?: string | null;
  budget?: string | null;
  timeline?: string | null;
  company?: string | null;
}): Promise<void> {
  await sendEmail({
    to: process.env.ADMIN_EMAIL!,
    subject: `New Project Request: ${data.title || data.projectType} from ${data.name}`,
    html: `
      <h2>New Project Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
      <p><strong>Project Type:</strong> ${data.projectType}</p>
      ${data.title ? `<p><strong>Title:</strong> ${data.title}</p>` : ""}
      ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ""}
      ${data.timeline ? `<p><strong>Timeline:</strong> ${data.timeline}</p>` : ""}
      <p><strong>Description:</strong></p>
      <p>${data.description}</p>
    `,
  });
}
