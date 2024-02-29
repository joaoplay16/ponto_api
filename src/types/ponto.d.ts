type Ponto = {
    id: number,
    data: string,
    hora_entrada: string,
    hora_saida: string?,
    usuario_id: number
}
export type WorkedHoursReport = {
  data: string
  dia_da_semana: string
  horas_trabalhadas: string
}

export type PontosQueryResult = { rows: Ponto[]; count: number }

export type PontosReportQueryResult = {
  rows: WorkedHoursReport[]
  count: number
}

export default Ponto