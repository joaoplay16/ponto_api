type Ponto = {
    id: number,
    data: string,
    hora_entrada: string,
    hora_saida: string?
}

export type PontosQueryResult = { rows: Ponto[]; count: number }

export default Ponto