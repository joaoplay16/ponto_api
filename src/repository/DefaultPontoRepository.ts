import { Sequelize } from "sequelize"
import PontoModel from "../models/Ponto"
import { PontosQueryResult } from "../types/ponto"
import PontoRepository from "./PontoRepository"

class DefaultPontoRepository implements PontoRepository {
  async getAll(
    user_id: number,
    limit: number,
    offset: number
  ): Promise<PontosQueryResult> {
    const pontosPaginados = await PontoModel.findAndCountAll({
      where: {
        usuario_id: user_id,
      },
      attributes: [
        "data",
        [Sequelize.fn("dayofweek", Sequelize.col("data")), "dia_da_semana"],
        "hora_entrada",
        "hora_saida",
      ],
      order: [
        ["id", "DESC"],
        ["data", "DESC"],
        ["hora_entrada", "DESC"],
      ],
      limit,
      offset,
    })

    return pontosPaginados
  }
}

export default DefaultPontoRepository