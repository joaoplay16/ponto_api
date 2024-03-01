import ApiRequestError from "../errors/ApiRequestError"
import PontoRepository from "../repository/PontoRepository"
import { PontosReportQueryResult } from "../types/ponto"

class WorkingHoursReportUsecase {
  private pontoRepository: PontoRepository

  constructor(pontoRepository: PontoRepository) {
    this.pontoRepository = pontoRepository
  }

  async workingHoursReport(
    user_id?: string,
    mes?: string,
    ano?: string,
    limit?: string,
    offset?: string
  ): Promise<PontosReportQueryResult> {
    /* c8 ignore start */
    const id = parseInt(user_id || "")
    const month = parseInt(mes || "")
    const year = parseInt(ano || "")
    /* c8 ignore end */

    if (isNaN(id) || isNaN(month) || isNaN(year)) {
      throw new ApiRequestError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    }

    return this.pontoRepository.workingHoursReport(
      id,
      month,
      year,
      /* c8 ignore next */
      parseInt(limit || "20"),
      /* c8 ignore next */
      parseInt(offset || "0")
    )
  }
}

export default WorkingHoursReportUsecase
