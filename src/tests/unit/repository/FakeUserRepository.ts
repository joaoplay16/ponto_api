import Usuario, { UsersQueryResult } from "../../../types/usuario"
import UserRepository from "../../../repository/UserRepository"

class FakeUserRepository implements UserRepository {
  users: UsersQueryResult = { rows: [], count: 0 }

  constructor(users?: Usuario[]) {
    if (users) {
      this.users.rows = users
      this.users.count = users.length
    }
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
