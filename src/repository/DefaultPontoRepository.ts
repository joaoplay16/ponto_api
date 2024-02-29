import { Op, Sequelize } from "sequelize"
import PontoModel from "../models/Ponto"
import { PontosQueryResult, PontosReportQueryResult } from "../types/ponto"
import PontoRepository from "./PontoRepository"

const operatorsAliases = {
  $and: Op.and,
}

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

  async workingHoursReport(
    user_id: number,
    mes: number,
    ano: number,
    limit: number,
    offset: number
  ): Promise<PontosReportQueryResult> {
    const pontosPaginados = await PontoModel.findAndCountAll({
      where: {
        usuario_id: user_id,
        [operatorsAliases.$and]: [
          mes &&
            Sequelize.where(Sequelize.fn("month", Sequelize.col("data")), mes),
          ano &&
            Sequelize.where(Sequelize.fn("year", Sequelize.col("data")), ano),
        ],
      },
      attributes: [
        "data",
        [Sequelize.fn("dayofweek", Sequelize.col("data")), "dia_da_semana"],
        [
          Sequelize.fn(
            "SEC_TO_TIME",
            Sequelize.fn(
              "SUM",
              Sequelize.fn(
                "ABS",
                Sequelize.fn(
                  "TIME_TO_SEC",
                  Sequelize.fn(
                    "TIMEDIFF",
                    Sequelize.col("hora_entrada"),
                    Sequelize.col("hora_saida")
                  )
                )
              )
            )
          ),
          "horas_trabalhadas",
        ],
      ],
      group: ["usuario_id", "data"],
      order: [["data", "DESC"]],
      limit,
      offset,
      raw: true,
    })

    const result: PontosReportQueryResult = {
      count: pontosPaginados.count.length,
      rows: pontosPaginados.rows.map((ponto: any) => ({
        data: ponto.data,
        dia_da_semana: ponto.dia_da_semana,
        horas_trabalhadas: ponto.horas_trabalhadas,
      })),
    }

    return Promise.resolve(result)
  }
}

export default DefaultPontoRepository
