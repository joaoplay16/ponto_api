import AuthError from "../../../errors/AuthError"
import HashService from "../../../service/HashService"
import Usuario from "../../../types/usuario"
import AuthUseCase from "../../../usecases/AuthUseCase"
import FakeHashService from "../service/FakeHashService"
import FakeUserRepository from "../repository/FakeUserRepository"

import sinon from "sinon"

describe("Test auth use case", () => {
  let fakeUserRepositoryStub: sinon.SinonStubbedInstance<FakeUserRepository>
  let hashService: HashService
  let authUseCase: AuthUseCase | null

  beforeEach(() => {
    fakeUserRepositoryStub = sinon.createStubInstance(FakeUserRepository)
    hashService = new FakeHashService()
    authUseCase = new AuthUseCase(fakeUserRepositoryStub, hashService)
  })

  afterEach(() => {
    authUseCase = null
  })

  it("Should throw error 400 when receive invalid parameters", async () => {
    const invalidParameter: any = 5

    const promise = authUseCase?.authenticate(
      "testemail@example.com",
      invalidParameter
    )
    await expect(promise).to.be.eventually.rejectedWith(AuthError)

    await expect(
      authUseCase?.authenticate("testemail@example.com", invalidParameter)
    ).to.eventually.be.rejected.and.deep.equal(
      new AuthError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    )
  })

  it("Should throw error 400 when receive an invalid e-mail", async () => {
    await expect(
      authUseCase?.authenticate("testemail#example.com", "123456789")
    ).to.eventually.be.rejected.and.deep.equal(
      new AuthError(400, "E-mail inválido")
    )
  })

  it("Should throw error 400 when password length is less than 8 charaters", async () => {
    await expect(
      authUseCase?.authenticate("testemail@example.com", "1234567")
    ).to.eventually.be.rejected.and.deep.equal(
      new AuthError(400, "Senha inválida")
    )
  })

  it("Should throw error 403 when user doesn't exist", async () => {
    const unknownEmail = "unknown@testemail.com"

    fakeUserRepositoryStub.findUserByEmail.returns(
      sinon.promise<Usuario>().resolve(null)
    )

    await expect(
      authUseCase?.authenticate(unknownEmail, "12345678")
    ).to.eventually.be.rejected.and.deep.equal(
      new AuthError(400, "Este e-mail não está cadastrado.")
    )
  })

  it("Should throw error 403 when user has incomplete registration", async () => {
    const testUser: Usuario = {
      id: 1,
      nome: "Test User",
      cargo: "colaborador",
      nome_de_usuario: "testuser",
      email: "testemail@example.com",
      senha: "", // Empty password means incomplete registration
      celular: "99982287525",
      criado_em: new Date(),
      e_admin: 0,
      ativo: 1,
      pontos: [],
    }

    fakeUserRepositoryStub.findUserByEmail.returns(
      sinon.promise<Usuario>().resolve(testUser)
    )

    await expect(
      authUseCase?.authenticate(testUser.email, "12345678")
    ).to.eventually.be.rejected.and.deep.equal(
      new AuthError(
        403,
        "Continue seu cadastro. Um e-mail foi enviado com as instruções para continuar seu cadastro."
      )
    )
  })

  it("Should throw error 403 when user is account is deactivated", async () => {
    const testUser: Usuario = {
      id: 1,
      nome: "Test User",
      cargo: "colaborador",
      nome_de_usuario: "testuser",
      email: "testemail@example.com",
      senha: "123456789", // Empty password means incomplete registration
      celular: "99982287525",
      criado_em: new Date(),
      e_admin: 0,
      ativo: 0,
      pontos: [],
    }

    fakeUserRepositoryStub.findUserByEmail.returns(
      sinon.promise<Usuario>().resolve(testUser)
    )

    await expect(
      authUseCase?.authenticate(testUser.email, "12345678")
    ).to.eventually.be.rejected.and.deep.equal(
      new AuthError(
        403,
        "Sua conta está desativada/bloqueada. Entre em contato com o suporte para obter assistência."
      )
    )
  })

  it("Should throw error 403 when receive invalid credentials", async () => {
    const testUser: Usuario = {
      id: 1,
      nome: "Test User",
      cargo: "colaborador",
      nome_de_usuario: "testuser",
      email: "testemail@example.com",
      senha: "123456789", // Empty password means incomplete registration
      celular: "99982287525",
      criado_em: new Date(),
      e_admin: 0,
      ativo: 1,
      pontos: [],
    }

    fakeUserRepositoryStub.findUserByEmail.returns(
      sinon.promise<Usuario>().resolve(testUser)
    )

    await expect(
      authUseCase?.authenticate(testUser.email, "123456780")
    ).to.eventually.be.rejected.and.deep.equal(
      new AuthError(
        403,
        "Credenciais de login inválidas. Por favor, verifique seu email e senha e tente novamente."
      )
    )
  })

  it("Should return the authenticated user", async () => {
    const testUser: Usuario = {
      id: 1,
      nome: "Test User",
      cargo: "colaborador",
      nome_de_usuario: "testuser",
      email: "testemail@example.com",
      senha: "123456789", 
      celular: "99982287525",
      criado_em: new Date(),
      e_admin: 0,
      ativo: 1,
      pontos: [],
    }

    fakeUserRepositoryStub.findUserByEmail.returns(
      sinon.promise<Usuario>().resolve(testUser)
    )

    await expect(
     authUseCase?.authenticate(testUser.email, "123456789")
    ).to.eventually.be.fulfilled.and.deep.equal(testUser)
  })
})
