import ApiRequestError from "../../../errors/ApiRequestError"
import PontoRepository from "../../../repository/PontoRepository"
import GetPontosUsecase from "../../../usecases/GetPontosUsecase"
import fakePontos from "../../mocks/fakePontos"
import FakePontoRepository from "../repository/FakePontoRepository"

describe("Test GetPontosUsecase", () => {
  let pontosRepository: PontoRepository
  let getPontosUsecase: GetPontosUsecase

  beforeEach(() => {
    pontosRepository = new FakePontoRepository(fakePontos)
    getPontosUsecase = new GetPontosUsecase(pontosRepository)
  })

  it("Should throw ApiRequestError when receive an invalid user_id", async () => {
    await expect(
      getPontosUsecase.getAll(undefined, "0", "0")
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    )
    await expect(
      getPontosUsecase.getAll("A", "0", "0")
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    )
  })

  it("Should return 'Pontos' from the given user_id", async () => {
    const result = await getPontosUsecase.getAll("1", "0", "0")

    await expect(result.count).to.be.greaterThan(0)
  })
})
