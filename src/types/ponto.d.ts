type Ponto = {
    id: number,
    data: string,
    hora_entrada: string,
    hora_saida: string?,
    usuario_id: number
}

export type PontosQueryResult = { rows: Ponto[]; count: number }

export default Ponto