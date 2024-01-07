const Ponto = require("../models/Ponto")
import { type Request, type Response } from "express"
import type Ponto from "../types/ponto"
import { Sequelize, Op } from "sequelize"
const PontoController = {
  async index(req: Request, res: Response): Promise<void> {
    try {
      const { id_usuario } = req.params
      const { limit, offset } = req.query

      const pontosPaginados = await Ponto.findAndCountAll({
        where: {
          usuario_id: id_usuario,
        },
        attributes: [
          "data",
          [Sequelize.fn("dayofweek", Sequelize.col("data")), "dia_da_semana"],
          "hora_entrada",
          "hora_saida",
        ],
        limit: parseInt(limit as string) || 20,
        offset: parseInt(offset as string) || 0,
      })

      if (pontosPaginados != null) {
        res.json(pontosPaginados)
      } else {
        res.status(404).json({ error: "Nenhum registro de ponto encontrado" })
      }
    } catch (error) {
      console.error("Erro ao buscar registros de ponto:", error)
      res.status(500).json({ error: "Erro interno do servidor" })
    }
  },

  async userReport(req: Request, res: Response): Promise<void> {
    try {
      const { id_usuario } = req.params
      const { limit, offset, mes, ano } = req.query

      const pontosPaginados = await Ponto.findAll({
        where: {
          usuario_id: id_usuario,
          [Op.and]: [
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
        limit: parseInt(limit as string) || 20,
        offset: parseInt(offset as string) || 0,
      })

      if (pontosPaginados != null) {
        res.json({ count: pontosPaginados.length, rows: pontosPaginados })
      } else {
        res.status(404).json({ error: "Nenhum registro de ponto encontrado" })
      }
    } catch (error) {
      console.error("Erro ao buscar registros de ponto:", error)
      res.status(500).json({ error: "Erro interno do servidor" })
    }
  },

  async usersReport(req: Request, res: Response): Promise<void> {
    try {
      const { limit, offset, mes, ano, cargo } = req.query

      const pontosPaginados = await Ponto.findAll({
        where: {
          [Op.and]: [
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
              ...(cargo && {cargo})
            }
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
        res.json({ count: pontosPaginados.length, rows: pontosPaginados })
      } else {
        res.status(404).json({ error: "Nenhum registro de ponto encontrado" })
      }
    } catch (error) {
      console.error("Erro ao buscar registros de ponto:", error)
      res.status(500).json({ error: "Erro interno do servidor" })
    }
  },

  async details(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const ponto: Ponto = await Ponto.findByPk(id)
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

  async save(req: Request, res: Response): Promise<void> {},
}

export default PontoController
