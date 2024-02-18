import bcrypt from "bcrypt"
import HashService from "./HashService"

class BcryptHashService implements HashService {
  compareSync(plaintext: string, hashed: string): boolean {
    return bcrypt.compareSync(plaintext, hashed)
  }
  hashSync(plaintext: string): string {
    return bcrypt.hashSync(plaintext, 10)
  }
}

export default BcryptHashService
