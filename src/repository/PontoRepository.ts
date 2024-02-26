import { PontosQueryResult } from "../types/ponto"

interface PontoRepository {
  getAll(
    user_id: number,
    limit: number,
    offset: number
  ): Promise<PontosQueryResult>
}

export default PontoRepository
