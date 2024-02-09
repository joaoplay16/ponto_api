import Usuario from "../../../types/usuario"
import UserRepository from "../../../repository/UserRepository"

class FakeUserRepository implements UserRepository {
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
      pontos: []
    }
  }
}

export default FakeUserRepository
