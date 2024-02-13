import DatabaseOperationError from "../../../errors/DatabaseOperationError"
import { UsersQueryResult } from "../../../types/usuario"
import GetUsersUseCase from "../../../usecases/GetUsersUseCase"
import fakeUsers from "../../mocks/fakeUsers"
import FakeUserRepository from "../repository/FakeUserRepository"

describe("Test users search", () => {
  let fakeUserRepository: FakeUserRepository
  let getUsersUseCase: GetUsersUseCase

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    getUsersUseCase = new GetUsersUseCase(fakeUserRepository)
  })

  it("Should throw error when return empty result", async () => {
    await expect(
      getUsersUseCase.find("colaborador", "0", "0")
    ).to.be.eventually.rejected.and.deep.equal(
      new DatabaseOperationError(404, "Nenhum usuário encontrado")
    )
  })
  
  it("Should return users with by role", async () => {
    fakeUserRepository = new FakeUserRepository(fakeUsers)
    getUsersUseCase = new GetUsersUseCase(fakeUserRepository)

    const colaboratorUsers = fakeUsers.filter(
      (user) => user.cargo == "colaborador"
    )

    const result: UsersQueryResult = await getUsersUseCase.find(
      "colaborador",
      "0",
      "0"
    )

    expect(result.rows).to.be.deep.equal(colaboratorUsers)
  })
})
