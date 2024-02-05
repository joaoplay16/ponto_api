import { ApiError } from "../types/auth"

class AuthError extends Error implements ApiError {
  statusCode: number
  errorMessage: string

  constructor(statusCode: number, errorMessage: string) {
    super(errorMessage)
    this.statusCode = statusCode
    this.errorMessage = errorMessage
  }
}

export default AuthError
