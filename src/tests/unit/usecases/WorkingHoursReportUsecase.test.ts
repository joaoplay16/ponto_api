import ApiRequestError from "../../../errors/ApiRequestError"
import PontoRepository from "../../../repository/PontoRepository"
import { PontosReportQueryResult } from "../../../types/ponto"
import WorkingHoursReportUsecase from "../../../usecases/WorkingHoursReportUsecase"
import fakePontos from "../../mocks/fakePontos"
import FakePontoRepository from "../repository/FakePontoRepository"

describe("Test WorkingHoursReportUsecase", () => {
  let pontosRepositoryStub: sinon.SinonStubbedInstance<FakePontoRepository>
  let getPontosUsecase: WorkingHoursReportUsecase

  beforeEach(() => {
    pontosRepositoryStub = sinon.createStubInstance(FakePontoRepository)
    getPontosUsecase = new WorkingHoursReportUsecase(pontosRepositoryStub)
  })

  it("Should throw ApiRequestError when receive an invalid user_id, month and year", async () => {
    await expect(
      getPontosUsecase.workingHoursReport("invalid_id", "1", "2024")
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    )

    await expect(
      getPontosUsecase.workingHoursReport("1", "invalid_month", "2024")
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    )
    await expect(
      getPontosUsecase.workingHoursReport("1", "1", "invalid_year")
    ).to.be.eventually.rejected.and.deep.equal(
      new ApiRequestError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    )
  })

  it("Should return worked hours from the given user_id", async () => {
    pontosRepositoryStub.workingHoursReport.returns(
      sinon.promise<PontosReportQueryResult>().resolve({ count: 1, rows: [{
        data: "2024-01-01",
        dia_da_semana: "6",
        horas_trabalhadas: "08:00:00"
      }] })
    )

    const result = await getPontosUsecase.workingHoursReport("1", "1", "2024")

    await expect(result.count).to.be.greaterThan(0)
  })
})
