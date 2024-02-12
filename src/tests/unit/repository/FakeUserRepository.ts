import Usuario, { UsersQueryResult } from "../../../types/usuario"
import UserRepository from "../../../repository/UserRepository"

class FakeUserRepository implements UserRepository {
  users: UsersQueryResult = { rows: [], count: 0 }

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

    this.users.rows = filteredUsers
    this.users.count = filteredUsers.length

    return Promise.resolve(this.users)
  }
  async findUserByEmail(email: string): Promise<Usuario | null> {
    return {
      id: 1,
      nome: "Test User",
      cargo: "colaborador",
      nome_de_usuario: "testuser",
      email: "testuse@gmail.com",
      senha: "123456789",
      celular: "99982287525",
      criado_em: "2024-01-01",
      e_admin: 0,
      ativo: 1,
      pontos: [],
    }
  }
}

export default FakeUserRepository
