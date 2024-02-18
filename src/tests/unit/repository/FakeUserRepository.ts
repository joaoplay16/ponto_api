import Usuario, { UsersQueryResult } from "../../../types/usuario"
import UserRepository from "../../../repository/UserRepository"
import DatabaseOperationError from "../../../errors/DatabaseOperationError"

class FakeUserRepository implements UserRepository {
  users: UsersQueryResult = { rows: [], count: 0 }

  constructor(users?: Usuario[]) {
    if (users) {
      this.users.rows = users
      this.users.count = users.length
    }
  }
  create(user: Usuario): Promise<Usuario> {
    user.id = this.users.count + 1
    this.users.rows.push(user)
    return Promise.resolve(user)
  }

  async update(user: Usuario): Promise<void> {
    let userToUpdateIndex = this.users.rows.findIndex((u) => u.id === user.id)
    if (userToUpdateIndex !== -1) {
      this.users.rows[userToUpdateIndex].senha = user.senha
      return Promise.resolve()
    } else {
      throw new DatabaseOperationError(500, "Falha ao atualizar usuário")
    }
  }

  findUserByUsername(username: string): Promise<Usuario | null> {
    let user = this.users.rows.find((user) => user.nome_de_usuario === username)
    return Promise.resolve(user ?? null)
  }

  findUserById(id: number): Promise<Usuario | null> {
    const result = this.users.rows.find((user) => user.id === id)
    return Promise.resolve(result ?? null)
  }

  getUsers(
    cargo: string,
    limit: number,
    offset: number
  ): Promise<UsersQueryResult> {
    let filteredUsers = this.users.rows

    if (cargo) {
      filteredUsers = filteredUsers.filter((user) => user.cargo === cargo)
    }

    if (limit && offset) {
      const startIndex = offset
      const endIndex = startIndex + limit
      filteredUsers = filteredUsers.slice(startIndex, endIndex)
    }

    return Promise.resolve({ rows: filteredUsers, count: filteredUsers.length })
  }
  async findUserByEmail(email: string): Promise<Usuario | null> {
    const user = this.users.rows.find((user) => user.email == email)
    return Promise.resolve(user ?? null)
  }
}

export default FakeUserRepository
