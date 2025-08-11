import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, name, phone, address, office } = req.body;
  if (!name || !phone || !address || !office) {
    return res.status(405).json({ error: "Some fields are missing" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.TARGET_EMAILS,
      subject: `${name} | ${address}`,
      html: `<p>
      <p><b>Name</b>  : ${name}</p>\n
      <p><b>Phone</b>  :${phone}</p>\n
       <p><b>Office</b>  :${office}</p>\n
      <p><b>Address</b>  :${address.replace(/\n/g, "<br>")}</p>\n
      Your scanned PDF is ready: <a href="${url}" target="_blank">Download PDF</a></p>`,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Email send failed",
      env: process.env.EMAIL_USER,
      p: process.env.EMAIL_PASS,
    });
  }
}
