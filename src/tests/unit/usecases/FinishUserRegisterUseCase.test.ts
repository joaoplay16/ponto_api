import ApiRequestError from "../../../errors/ApiRequestError"
import BcryptHashService from "../../../service/BcryptHashService"
import HashService from "../../../service/HashService"
import Usuario from "../../../types/usuario"
import CreateUserUseCase from "../../../usecases/CreateUserUseCase"
import FinishUserRegisterUseCase from "../../../usecases/FinishUserRegisterUseCase"
import fakeUsers from "../../mocks/fakeUsers"
import FakeUserRepository from "../repository/FakeUserRepository"

describe("Test user update usecase", () => {
  let fakeUserRepository: FakeUserRepository
  let finishUserRegisterUseCase: FinishUserRegisterUseCase
  let hashService: HashService

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository(fakeUsers)
    hashService = new BcryptHashService()
    finishUserRegisterUseCase = new FinishUserRegisterUseCase(
      fakeUserRepository,
      hashService
    )
  })

  it("Should throw ApiRequestError when receive empty parameters", async () => {
    let username = "" // Invalid: empty
    let password = "" // Invalid: empty

    await expect(
      finishUserRegisterUseCase.finishRegister(username, password)
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    )
  })

  it("Should throw ApiRequestError when the password length is less than 8 characters", async () => {
    let username = fakeUsers[0].nome_de_usuario // already registered
    let password = "1234567"

    await expect(
      finishUserRegisterUseCase.finishRegister(username, password)
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(400, "A senha deve ter 8 ou mais caracteres.")
    )
  })

  it("Should throw ApiRequestError when the user is not found", async () => {
    let username = "unknown" // does not exists
    let password = "32456789"

    await expect(
      finishUserRegisterUseCase.finishRegister(username, password)
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(404, "Usuário não encontrado")
    )
  })

  it("Should throw ApiRequestError when the user was already full registered", async () => {
    let username = fakeUsers[0].nome_de_usuario // already registered
    let password = "32456789"

    await expect(
      finishUserRegisterUseCase.finishRegister(username, password)
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(409, "O cadastro já foi finalizado")
    )
  })

  it("Should update the user with the hashed password", async () => {
    let newPassword = "new_password"

    let user: Usuario = {
      id: 1,
      nome: "Savatori Piazzo",
      cargo: "colaborador",
      nome_de_usuario: "savazzo",
      email: "savazzo@example.com",
      senha: "",
      celular: "12345678901",
      criado_em: new Date(),
      e_admin: 0,
      ativo: 1,
      pontos: [],
    }

    const createdUser = await fakeUserRepository.create(user)

    await expect(
      finishUserRegisterUseCase.finishRegister(
        createdUser.nome_de_usuario,
        newPassword
      )
    ).to.be.eventually.fulfilled

    const fullRegisteredUser = await fakeUserRepository.findUserById(
      createdUser.id
    )

    expect(fullRegisteredUser?.senha.length).to.be.greaterThan(0)
  })
})
