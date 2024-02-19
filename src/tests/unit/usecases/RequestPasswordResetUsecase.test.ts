import ApiRequestError from "../../../errors/ApiRequestError"
import MailingService from "../../../service/MailingService"
import RequestPasswordResetUsecase from "../../../usecases/RequestPasswordResetUsecase"
import fakeUsers from "../../mocks/fakeUsers"
import FakeUserRepository from "../repository/FakeUserRepository"
import FakeEmailService from "../service/FakeEmailService"

describe("Test user request passorwd reset usecase", () => {
  let fakeUserRepository: FakeUserRepository
  let requestPasswordResetUsecase: RequestPasswordResetUsecase
  let mailingService: MailingService

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository(fakeUsers)
    mailingService = new FakeEmailService()
    requestPasswordResetUsecase = new RequestPasswordResetUsecase(
      fakeUserRepository,
      mailingService
    )
  })

  it("Should throw ApiRequestError when receive empty parameters", async () => {
    await expect(
      requestPasswordResetUsecase.sendRecoveryEmail("")
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    )
  })

  it("Should throw ApiRequestError when the password length is less than 8 characters", async () => {
    await expect(
      requestPasswordResetUsecase.sendRecoveryEmail("example#example.com")
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(400, "Informe um e-mail válido.")
    )
  })

  it("Should throw ApiRequestError when the user is not found", async () => {
    await expect(
      requestPasswordResetUsecase.sendRecoveryEmail("example@example.com")
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(404, "Este email não está cadastrado")
    )
  })

  it("Should send a password recovery email", async () => {
    await expect(
      requestPasswordResetUsecase.sendRecoveryEmail(fakeUsers[0].email)
    ).to.be.eventually.fulfilled
  })
})
