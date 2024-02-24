import DatabaseOperationError from "../errors/DatabaseOperationError"
import UserRepository from "../repository/UserRepository"
import { UsersQueryResult } from "../types/usuario"

class GetUsersUseCase {
  userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async find(
    cargo?: string,
    limit?: string,
    offset?: string
  ): Promise<UsersQueryResult> {
    const users = await this.userRepository.getUsers(
      cargo,
      parseInt(limit as string) || 20,
      parseInt(offset as string) || 0
    )

    if (users.count == 0) {
      throw new DatabaseOperationError(404, "Nenhum usuário encontrado")
    } else {
      return Promise.resolve(users)
    }
  }
}

export default GetUsersUseCase
