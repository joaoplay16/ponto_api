import PontoRepository from "../../../repository/PontoRepository"
import Ponto, {
  PontosQueryResult,
  PontosReportQueryResult,
} from "../../../types/ponto"

class FakePontoRepository implements PontoRepository {
  pontos: Ponto[] = []

  constructor(pontos?: Ponto[]) {
    if (pontos) this.pontos = pontos
  }

  getAll(
    user_id: number,
    limit: number,
    offset: number
  ): Promise<PontosQueryResult> {
    let found = this.pontos.filter((ponto) => ponto.usuario_id === user_id)

    if (limit && offset) {
      const startIndex = offset
      const endIndex = startIndex + limit
      found = found.slice(startIndex, endIndex)
    }

    return Promise.resolve({ count: found.length, rows: found })
  }

  workingHoursReport(
    user_id: number,
    mes: number,
    ano: number,
    limit: number,
    offset: number
  ): Promise<PontosReportQueryResult> {
    return Promise.resolve( {count: 0, rows: []})
  }
}

export default FakePontoRepository
