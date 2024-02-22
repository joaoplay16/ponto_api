interface TokenService {
  verify(token: string): { [key: string]: any }
  sign(token: string | object): string
}

export default TokenService