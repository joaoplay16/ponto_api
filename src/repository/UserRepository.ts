import Usuario, { UsersQueryResult } from "../types/usuario"

interface UserRepository {
  findUserByEmail(email: string): Promise<Usuario | null>
  getUsers(
    cargo: string,
    limit: number,
    offset: number
  ): Promise<UsersQueryResult>
  findUserById(id: number): Promise<Usuario | null>
  create(user: Usuario): Promise<Usuario | null>
}

export default UserRepository
