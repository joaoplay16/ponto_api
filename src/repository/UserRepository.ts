import Usuario from "../types/usuario"

interface UserRepository {
  findUserByEmail(email: string): Promise<Usuario | null>
}

export default UserRepository
