import { type Request, type Response } from "express"
import { Op, Sequelize } from "sequelize"
import DatabaseOperationError from "../errors/DatabaseOperationError"
import PontoModel from "../models/Ponto"
import DefaultPontoRepository from "../repository/DefaultPontoRepository"
import GetPontosUsecase from "../usecases/GetPontosUsecase"
import WorkingHoursReportUsecase from "../usecases/WorkingHoursReportUsecase"
const operatorsAliases = {
  $and: Op.and,
}
const PontoController = {
  async index(req: Request, res: Response): Promise<void> {
    try {
      const { id_usuario } = req.params
      const { limit, offset } = req.query

      const usecase = new GetPontosUsecase(new DefaultPontoRepository())
      const pontosPaginados = await usecase.getAll(
        id_usuario,
        limit as string,
        offset as string
      )

      if (pontosPaginados != null) {
        res.json(pontosPaginados)
      } else {
        res.status(404).json({ error: "Nenhum registro de ponto encontrado" })
      }
    } catch (error) {
      if (error instanceof DatabaseOperationError) {
        res.status(error.statusCode).json(error.errorMessage)
        return
      }
      res.status(500).json({ error: "Erro interno do servidor", info: error })
    }
  },

  async userReport(req: Request, res: Response): Promise<void> {
    try {
      const { id_usuario } = req.params
      const { limit, offset, mes, ano } = req.query

      const usecase = new WorkingHoursReportUsecase(
        new DefaultPontoRepository()
      )

      const pontosPaginados = await usecase.workingHoursReport(
        id_usuario,
        mes as string,
        ano as string,
        limit as string,
        offset as string
      )

        res.json({
          count: pontosPaginados.rows.length,
          rows: pontosPaginados.rows,
        })
    
    } catch (error) {
      console.error("Erro ao buscar registros de ponto:", error)
      res.status(500).json({ error: "Erro interno do servidor" })
    }
  },

  async usersReport(req: Request, res: Response): Promise<void> {
    try {
      const { limit, offset, mes, ano, cargo } = req.query

      const pontosPaginados = await PontoModel.findAndCountAll({
        where: {
          [operatorsAliases.$and]: [
            mes &&
              Sequelize.where(
                Sequelize.fn("month", Sequelize.col("data")),
                mes
              ),
            ano &&
              Sequelize.where(Sequelize.fn("year", Sequelize.col("data")), ano),
          ],
        },
        include: [
          {
            association: "usuario",
            attributes: { exclude: ["senha"] },
            where: {
              ...(cargo && { cargo }),
            },
          },
        ],
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
        limit: parseInt(limit as string) || 20,
        offset: parseInt(offset as string) || 0,
      })

      if (pontosPaginados != null) {
        res.json({
          count: pontosPaginados.rows.length,
          rows: pontosPaginados.rows,
        })
      } else {
        res.status(404).json({ error: "Nenhum registro de ponto encontrado" })
      }
    } catch (error) {
      console.error("Erro ao buscar registros de ponto:", error)
      res.status(500).json({ error: "Erro interno do servidor" })
    }
  },

  async userMonthWorkingHoursReport(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id_usuario } = req.params

      const { mes, ano } = req.query

      const horasTrabalhadasMesAno: unknown[] = await PontoModel.findAll({
        where: {
          usuario_id: id_usuario,

          [operatorsAliases.$and]: [
            mes &&
              Sequelize.where(
                Sequelize.fn("month", Sequelize.col("data")),
                mes
              ),
            ano &&
              Sequelize.where(Sequelize.fn("year", Sequelize.col("data")), ano),
          ],
        },
        attributes: [
          "usuario_id",
          [Sequelize.fn("MONTH", Sequelize.col("data")), "mes"],
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
        group: ["usuario_id", "mes"],
      })

      if (horasTrabalhadasMesAno != null) {
        res.json(horasTrabalhadasMesAno[0])
      } else {
        res
          .status(404)
          .json({ error: "Horas trabalhadas do mês informado não encontradas" })
      }
    } catch (error) {
      console.error(
        "Erro ao buscar registros de horas trabalhadas do mês informado:",
        error
      )
      res.status(500).json({ error: "Erro interno do servidor" })
    }
  },

  async details(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const ponto = await PontoModel.findByPk(id)
      if (ponto != null) {
        res.json(ponto)
      } else {
        res.status(404).json({ error: "Registro de ponto não encontrado" })
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error)
      res.status(404).json({ error: "Registro de ponto não encontrado" })
    }
  },

  async save(req: Request, res: Response): Promise<void> {
    try {
      const { id_usuario } = req.params

      // Procura registros de ponto para o usuario atual que so possua a hora de entrada
      const pontoExistente: PontoModel | null = await PontoModel.findOne({
        where: {
          usuario_id: id_usuario,
          data: Sequelize.fn("DATE", Sequelize.fn("NOW")),
          hora_saida: null,
        },
      })

      if (pontoExistente) {
        // Ponto do dia atual existe (hora de entrada), define a hora de saída no registro existente
        await PontoModel.update(
          {
            hora_saida: Sequelize.literal("time(now())"),
          },
          {
            where: {
              usuario_id: id_usuario,
              data: Sequelize.literal("date(now())"),
              hora_saida: null,
            },
          }
        )

        res.status(200).send()
      } else {
        // Ponto do dia atual não existe, cria um novo com a hora de entrada
        await PontoModel.create({
          data: Sequelize.fn("DATE", Sequelize.fn("NOW")),
          hora_entrada: Sequelize.fn("TIME", Sequelize.fn("NOW")),
          usuario_id: id_usuario,
        })

        res.status(200).send()
      }
    } catch (error: any) {
      console.log("Erro interno do servidor", error)
      if (error?.original?.code == "ER_TRUNCATED_WRONG_VALUE") {
        res.status(400).json({ error: "Erro, data inválida" })
        return
      }
      res.status(500).json({ error: "Erro interno do servidor" })
    }
  },
}

export default PontoController
