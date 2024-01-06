const Ponto = require("../models/Ponto")
import { type Request, type Response } from "express"
import type Ponto from "../types/ponto"

const PontoController = {
  async index(req: Request, res: Response): Promise<void> {
    try {
      const { id_usuario } = req.params
      const { limit, offset } = req.query

      const pontosPaginados = await Ponto.findAndCountAll({
        where: {
          usuario_id: id_usuario,
        },
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
