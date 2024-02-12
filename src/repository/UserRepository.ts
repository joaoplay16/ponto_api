import Usuario, { UsersQueryResult } from "../types/usuario"

interface UserRepository {
  findUserByEmail(email: string): Promise<Usuario | null>
  getUsers(
    cargo: string,
    limit: number,
    offset: number
  ): Promise<UsersQueryResult>
}

export default UserRepository
