import HashService from "../../../service/HashService"

class FakeHashService implements HashService {
  compareSync(plaintext: string, hashed: string): boolean {
    return plaintext === hashed
  }
}

export default FakeHashService