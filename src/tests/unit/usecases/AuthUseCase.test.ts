import AuthError from "../../../errors/AuthError"
import AuthUseCase from "../../../usecases/AuthUseCase"
import FakeUserRepository from "./FakeAuthRepository"

describe("Test auth use case", () => {
  let authUseCase: AuthUseCase | null

  beforeEach(() => {
    authUseCase = new AuthUseCase(new FakeUserRepository())
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
})
