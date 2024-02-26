import ApiRequestError from "../errors/ApiRequestError"
import PontoRepository from "../repository/PontoRepository"
import { PontosQueryResult } from "../types/ponto"

class GetPontosUsecase {
  repository: PontoRepository

  constructor(repository: PontoRepository) {
    this.repository = repository
  }

  getAll(
    user_id?: string,
    limit?: string,
    offset?: string
  ): Promise<PontosQueryResult> {

    const id = parseInt(user_id  || "")

    if (user_id === undefined || isNaN(id)) {
      throw new ApiRequestError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    }

    return this.repository.getAll(
      id,
      parseInt(limit || "20"),
      parseInt(offset || "0")
    )
  }
}

export default GetPontosUsecase
