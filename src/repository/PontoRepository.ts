import { PontosQueryResult, PontosReportQueryResult } from "../types/ponto"

interface PontoRepository {
  getAll(
    user_id: number,
    limit: number,
    offset: number
  ): Promise<PontosQueryResult>
  workingHoursReport(
    user_id: number,
    mes: number,
    ano: number,
    limit: number,
    offset: number,
  ): Promise<PontosReportQueryResult>
}

export default PontoRepository
