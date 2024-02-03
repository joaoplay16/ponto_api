import { ApiError } from "../types/auth"

class AuthError implements ApiError {
  statusCode: number
  errorMessage: string

  constructor(statusCode: number, errorMessage: string) {
    this.statusCode = statusCode
    this.errorMessage = errorMessage
  }
}

export default AuthError
