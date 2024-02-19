import HashService from "../../../service/HashService"

class FakeHashService implements HashService {
  compareSync(plaintext: string, hashed: string): boolean {
    return plaintext === hashed
  }
  hashSync(plaintext: string): string {
    return plaintext.split("").reverse().toString()
  }
}

export default FakeHashService