import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

interface OAuth2Credentials {
  type: "OAuth2"
  user: string
  pass?: never // OAuth2 não utiliza senha
  clientId: string
  clientSecret: string
  refreshToken: string
}

export type EmailFields = {
  to: string
  subject: string
  text?: string
  html?: string
}

const credentials: OAuth2Credentials = {
  type: "OAuth2",
  user: process.env.MAIL_USERNAME || "",
  clientId: process.env.OAUTH_CLIENTID || "",
  clientSecret: process.env.OAUTH_CLIENT_SECRET || "",
  refreshToken: process.env.OAUTH_REFRESH_TOKEN || "",
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: credentials,
})

async function sendMail({
  to,
  subject,
  text,
  html,
}: EmailFields): Promise<void> {
  const mailOptions: nodemailer.SendMailOptions = {
    from: credentials.user,
    to,
    subject,
    text,
    html,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log("E-mail enviado com sucesso!")
  } catch (error: any) {
    console.error("Erro ao enviar o e-mail:", error.message)
    throw error // Rejeita a Promise para sinalizar falha no envio
  }
}

export default sendMail
