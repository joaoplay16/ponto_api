interface HashService {
  compareSync(plaintext: string, hashed: string): boolean
}

export default HashService
