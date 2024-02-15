import { EmailFields } from "../types/email"

interface MailingService {
  sendMail({ to, subject, text, html }: EmailFields): Promise<void>
}

export default MailingService