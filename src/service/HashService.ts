interface HashService {
  compareSync(plaintext: string, hashed: string): boolean
  hashSync(plaintext: string): string
}

export default HashService
