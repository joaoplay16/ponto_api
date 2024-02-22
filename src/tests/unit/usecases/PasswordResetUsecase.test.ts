import ApiRequestError from "../../../errors/ApiRequestError"
import HashService from "../../../service/HashService"
import JwtTokenService from "../../../service/JwtTokenService"
import TokenService from "../../../service/TokenService"
import PasswordResetUsecase from "../../../usecases/PasswordResetUsecase"
import fakeUsers from "../../mocks/fakeUsers"
import FakeUserRepository from "../repository/FakeUserRepository"
import FakeHashService from "../service/FakeHashService"

describe("Test user password reset usecase", () => {
  let fakeUserRepository: FakeUserRepository
  let hashService: HashService
  let tokenService: sinon.SinonStubbedInstance<TokenService>
  let requestPasswordResetUsecase: PasswordResetUsecase

  beforeEach(() => {
    hashService = new FakeHashService()
    tokenService = sinon.createStubInstance(JwtTokenService)
    fakeUserRepository = new FakeUserRepository(fakeUsers)
    requestPasswordResetUsecase = new PasswordResetUsecase(
      fakeUserRepository,
      hashService,
      tokenService
    )
  })

  it("Should throw ApiRequestError when receive empty parameters", async () => {
    await expect(
      requestPasswordResetUsecase.resetPassword(undefined, undefined)
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    )
  })

  it("Should throw ApiRequestError when the password length is less than 8 characters", async () => {
    await expect(
      requestPasswordResetUsecase.resetPassword("token", "1234567")
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(400, "A senha deve ter 8 ou mais caracteres.")
    )
  })

  it("Should throw ApiRequestError when the decoded email is not valid", async () => {
    tokenService.verify.returns({ email: undefined })

    await expect(
      requestPasswordResetUsecase.resetPassword("token", "123456789")
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(400, "E-mail inválido")
    )
  })

  it("Should throw ApiRequestError when the user is not found", async () => {
    tokenService.verify.returns({ email: "unkonwn@example.com" })

    await expect(
      requestPasswordResetUsecase.resetPassword("token", "123456789")
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(404, "Este email não está cadastrado")
    )
  })

  it("Should update the user password", async () => {
    tokenService.verify.returns({ email: fakeUsers[0].email })

    await expect(
      requestPasswordResetUsecase.resetPassword("token", "123456789")
    ).to.be.eventually.fulfilled
  })
})
