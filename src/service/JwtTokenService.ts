import "dotenv/config"
import jwt, { JwtPayload, Secret } from "jsonwebtoken"
import ApiRequestError from "../errors/ApiRequestError"
import TokenService from "./TokenService"

class JwtTokenService implements TokenService {
  sign(token: string | object): string {
    throw new Error("Method not implemented.")
  }
  verify(token: string): { [key: string]: any } {
    const jwtSecretKey: Secret = process.env.JWT_SECRET_KEY || ""
    try {
      return jwt.verify(token, jwtSecretKey) as JwtPayload
    } catch (error) {
      if (
        error instanceof Error &&
        ["JsonWebTokenError", "TokenExpiredError"].includes(error.name)
      ) {
        throw new ApiRequestError(401, "Token inválido ou expirado.")
      }
      throw error
    }
  }
}

export default JwtTokenService
