import ApiRequestError from "../../../errors/ApiRequestError"
import BcryptHashService from "../../../service/BcryptHashService"
import HashService from "../../../service/HashService"
import Usuario from "../../../types/usuario"
import UpdateUserUseCase from "../../../usecases/UpdateUserUseCase"
import fakeUsers from "../../mocks/fakeUsers"
import FakeUserRepository from "../repository/FakeUserRepository"

describe("Test user update", () => {
  let fakeUserRepository: FakeUserRepository
  let hashService: HashService
  let updateUserUseCase: UpdateUserUseCase

  let userToUpdate: Partial<Usuario>
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository(fakeUsers)
    hashService = new BcryptHashService()
    updateUserUseCase = new UpdateUserUseCase(fakeUserRepository, hashService)

    userToUpdate = { ...fakeUsers[0] } // use rest operator to create a copy of the object, so that the tests do not interfere each other
  })

  afterEach(() => {})

  it("Should throw ApiRequestError when receive empty parameters", async () => {
    delete userToUpdate.nome

    await expect(
      updateUserUseCase.update(userToUpdate)
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    )
  })

  it("Should throw ApiRequestError when receive an invalid e-mail", async () => {
    userToUpdate.email = "example#example.com"

    await expect(
      updateUserUseCase.update(userToUpdate)
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(400, "Informe um e-mail válido.")
    )
  })

  it("Should throw ApiRequestError when 'ativo' or 'e_admin' is undefined", async () => {
    delete userToUpdate.ativo
    delete userToUpdate.e_admin

    await expect(
      updateUserUseCase.update(userToUpdate)
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    )
  })

  it("Should throw error 400 when password length is less than 8 charaters", async () => {
    userToUpdate.senha = "1234567"

    await expect(
      updateUserUseCase.update(userToUpdate)
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(400, "A senha deve ter 8 ou mais caracteres.")
    )
  })

  it("Should update the user", async () => {
    userToUpdate.nome = "Peter Quill"

    await expect(updateUserUseCase.update(userToUpdate)).to.be.eventually
      .fulfilled
  })
})
