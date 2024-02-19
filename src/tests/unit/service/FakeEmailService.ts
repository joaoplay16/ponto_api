import MailingService from "../../../service/MailingService"
import { EmailFields } from "../../../types/email"

class FakeEmailService implements MailingService {
  sendMail({ to, subject, text, html }: EmailFields): Promise<void> {
    return Promise.resolve()
  }
}

export default FakeEmailService
