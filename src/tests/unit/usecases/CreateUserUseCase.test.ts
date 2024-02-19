import ApiRequestError from "../../../errors/ApiRequestError"
import Usuario from "../../../types/usuario"
import CreateUserUseCase from "../../../usecases/CreateUserUseCase"
import FakeUserRepository from "../repository/FakeUserRepository"

describe("Test user creation", () => {
  let fakeUserRepository: FakeUserRepository
  let createUserUseCase: CreateUserUseCase

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    createUserUseCase = new CreateUserUseCase(fakeUserRepository)
  })

  it("Should throw ApiRequestError when receive empty parameters", async () => {
    let userToSave: Usuario = {
      id: 1,
      nome: "", // Ivalid: empty
      cargo: "colaborador",
      nome_de_usuario: "savazzo",
      email: "savazzo@example.com",
      senha: "senha123",
      celular: "12345678901",
      criado_em: new Date(),
      e_admin: 0,
      ativo: 1,
      pontos: [],
    }

    await expect(
      createUserUseCase.save(userToSave)
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    )
  })

  it("Should throw ApiRequestError when receive an invalid e-mail", async () => {
    let userToSave: Usuario = {
      id: 1,
      nome: "Savatori Piazzo",
      cargo: "colaborador",
      nome_de_usuario: "savazzo",
      email: "savazzo#example.com",
      senha: "senha123",
      celular: "12345678901",
      criado_em: new Date(),
      e_admin: 0,
      ativo: 1,
      pontos: [],
    }

    await expect(
      createUserUseCase.save(userToSave)
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(400, "Informe um e-mail válido.")
    )
  })

  it("Should return the created user", async () => {
    let userToSave: Usuario = {
      id: 1,
      nome: "Savatori Piazzo",
      cargo: "colaborador",
      nome_de_usuario: "savazzo",
      email: "savazzo@example.com",
      senha: "senha123",
      celular: "12345678901",
      criado_em: new Date(),
      e_admin: 0,
      ativo: 1,
      pontos: [],
    }

    await expect(
      createUserUseCase.save(userToSave)
    ).to.be.eventually.fulfilled.and.deep.equal(userToSave)
  })
})
