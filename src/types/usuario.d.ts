
type Usuario = {
    id: number,
    nome: string,
    cargo: string,
    nome_de_usuario: string,
    email: string,
    senha: string,
    celular: string,
    criado_em: Date,
    e_admin: number,
    ativo: number,
    pontos: Ponto[]
}


export type UsuarioSemSenha = Omit<Usuario, "senha">

export type UsersQueryResult = { rows: Usuario[]; count: number }

export default Usuario