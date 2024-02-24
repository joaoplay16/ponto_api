import Usuario, { UsersQueryResult } from "../types/usuario"

interface UserRepository {
  findUserByEmail(email: string): Promise<Usuario | null>
  getUsers(
    cargo: string | undefined,
    limit: number,
    offset: number
  ): Promise<UsersQueryResult>
  findUserById(id: number): Promise<Usuario | null>
  findUserByUsername(username: string): Promise<Usuario | null>
  findUserByEmail(email: string): Promise<Usuario | null>
  create(user: Usuario): Promise<Usuario | null>
  update(user: Usuario): Promise<void>
}

export default UserRepository
