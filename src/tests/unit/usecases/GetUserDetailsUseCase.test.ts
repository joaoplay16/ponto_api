import ApiRequestError from "../../../errors/ApiRequestError"
import DatabaseOperationError from "../../../errors/DatabaseOperationError"
import GetUserDetailsUseCase from "../../../usecases/GetUserDetailsUseCase"
import fakeUsers from "../../mocks/fakeUsers"
import FakeUserRepository from "../repository/FakeUserRepository"

describe("Test GetUserDetailsUseCase", () => {
  let fakeUserRepository: FakeUserRepository
  let getUserDetailsUseCase: GetUserDetailsUseCase

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository(fakeUsers)
    getUserDetailsUseCase = new GetUserDetailsUseCase(fakeUserRepository)
  })

  it("Should throw ApiRequestError when trying to find a user with invalid ID", async () => {
    await expect(
      getUserDetailsUseCase.findUserById("a")
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(
        404,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    )
  })

  it("Should throw DatabaseOperationError when the user is not found", async () => {
    await expect(
      getUserDetailsUseCase.findUserById("50")
    ).to.be.eventually.rejected.and.deep.equal(
      new DatabaseOperationError(404, "Nenhum usuário encontrado")
    )
  })

  it("Should return an user by the given the ID", async () => {
    await expect(
      getUserDetailsUseCase.findUserById("1")
    ).to.be.eventually.fulfilled.and.deep.equal(fakeUsers[0])
  })
})
