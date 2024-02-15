import Usuario from "../../types/usuario"

const fakeUsers: Usuario[] = [
  {
    id: 1,
    nome: "John Doe",
    cargo: "colaborador",
    nome_de_usuario: "john.doe",
    email: "john.doe@example.com",
    senha: "senha123",
    celular: "12345678901",
    criado_em: "2024-01-01",
    e_admin: 0,
    ativo: 1,
    pontos: [],
  },
  {
    id: 2,
    nome: "Jane Doe",
    cargo: "gestor",
    nome_de_usuario: "jane.doe",
    email: "jane.doe@example.com",
    senha: "senha456",
    celular: "98765432109",
    criado_em: "2024-01-02",
    e_admin: 0,
    ativo: 1,
    pontos: [],
  },
  {
    id: 3,
    nome: "Alice Johnson",
    cargo: "colaborador",
    nome_de_usuario: "alice.johnson",
    email: "alice.johnson@example.com",
    senha: "senha789",
    celular: "55555555550",
    criado_em: "2024-01-03",
    e_admin: 0,
    ativo: 1,
    pontos: [],
  },
  {
    id: 4,
    nome: "Bob Smith",
    cargo: "gestor",
    nome_de_usuario: "bob.smith",
    email: "bob.smith@example.com",
    senha: "senhaabc",
    celular: "11112222334",
    criado_em: "2024-01-04",
    e_admin: 0,
    ativo: 1,
    pontos: [],
  },
  {
    id: 5,
    nome: "Eva Williams",
    cargo: "colaborador",
    nome_de_usuario: "eva.williams",
    email: "eva.williams@example.com",
    senha: "senhaxyz",
    celular: "99998888776",
    criado_em: "2024-01-05",
    e_admin: 0,
    ativo: 1,
    pontos: [],
  },
  {
    id: 6,
    nome: "Charlie Brown",
    cargo: "gestor",
    nome_de_usuario: "charlie.brown",
    email: "charlie.brown@example.com",
    senha: "senhawow",
    celular: "66667777883",
    criado_em: "2024-01-06",
    e_admin: 0,
    ativo: 1,
    pontos: [],
  },
  {
    id: 7,
    nome: "Grace Lee",
    cargo: "colaborador",
    nome_de_usuario: "grace.lee",
    email: "grace.lee@example.com",
    senha: "senha1234",
    celular: "44443333222",
    criado_em: "2024-01-07",
    e_admin: 0,
    ativo: 1,
    pontos: [],
  },
  {
    id: 8,
    nome: "David Miller",
    cargo: "gestor",
    nome_de_usuario: "david.miller",
    email: "david.miller@example.com",
    senha: "senha5678",
    celular: "88889999000",
    criado_em: "2024-01-08",
    e_admin: 0,
    ativo: 1,
    pontos: [],
  },
  {
    id: 9,
    nome: "Emma Davis",
    cargo: "colaborador",
    nome_de_usuario: "emma.davis",
    email: "emma.davis@example.com",
    senha: "senha4321",
    celular: "77776666550",
    criado_em: "2024-01-09",
    e_admin: 0,
    ativo: 1,
    pontos: [],
  },
  {
    id: 10,
    nome: "Frank White",
    cargo: "gestor",
    nome_de_usuario: "frank.white",
    email: "frank.white@example.com",
    senha: "senha8765",
    celular: "11223344556",
    criado_em: "2024-01-10",
    e_admin: 0,
    ativo: 1,
    pontos: [],
  },
  {
    id: 11,
    nome: "Gina Taylor",
    cargo: "colaborador",
    nome_de_usuario: "gina.taylor",
    email: "gina.taylor@example.com",
    senha: "senhaabcd",
    celular: "99887766557",
    criado_em: "2024-01-11",
    e_admin: 0,
    ativo: 1,
    pontos: [],
  },
  {
    id: 12,
    nome: "Harry Wilson",
    cargo: "gestor",
    nome_de_usuario: "harry.wilson",
    email: "harry.wilson@example.com",
    senha: "senhaefgh",
    celular: "22334455668",
    criado_em: "2024-01-12",
    e_admin: 0,
    ativo: 1,
    pontos: [],
  },
  {
    id: 13,
    nome: "Ivy Anderson",
    cargo: "colaborador",
    nome_de_usuario: "ivy.anderson",
    email: "ivy.anderson@example.com",
    senha: "senhaijkl",
    celular: "88990011229",
    criado_em: "2024-01-13",
    e_admin: 0,
    ativo: 1,
    pontos: [],
  },
  {
    id: 14,
    nome: "Jack Brown",
    cargo: "gestor",
    nome_de_usuario: "jack.brown",
    email: "jack.brown@example.com",
    senha: "senhamnop",
    celular: "55667788990",
    criado_em: "2024-01-14",
    e_admin: 0,
    ativo: 1,
    pontos: [],
  },
  {
    id: 15,
    nome: "Kelly Johnson",
    cargo: "colaborador",
    nome_de_usuario: "kelly.johnson",
    email: "kelly.johnson@example.com",
    senha: "senahefgh",
    celular: "33445566770",
    criado_em: "2024-01-15",
    e_admin: 0,
    ativo: 1,
    pontos: [],
  },
  {
    id: 16,
    nome: "Leo Davis",
    cargo: "gestor",
    nome_de_usuario: "leo.davis",
    email: "leo.davis@example.com",
    senha: "senhaqrst",
    celular: "11223344551",
    criado_em: "2024-01-16",
    e_admin: 0,
    ativo: 1,
    pontos: [],
  },
  {
    id: 17,
    nome: "Mary Wilson",
    cargo: "colaborador",
    nome_de_usuario: "mary.wilson",
    email: "mary.wilson@example.com",
    senha: "senhauvwx",
    celular: "77889900112",
    criado_em: "2024-01-17",
    e_admin: 0,
    ativo: 1,
    pontos: [],
  },
  {
    id: 18,
    nome: "Nathan Moore",
    cargo: "gestor",
    nome_de_usuario: "nathan.moore",
    email: "nathan.moore@example.com",
    senha: "senhijklm",
    celular: "22334455660",
    criado_em: "2024-01-18",
    e_admin: 0,
    ativo: 1,
    pontos: [],
  },
  {
    id: 19,
    nome: "Olivia Taylor",
    cargo: "colaborador",
    nome_de_usuario: "olivia.taylor",
    email: "olivia.taylor@example.com",
    senha: "senhaopqr",
    celular: "99887766553",
    criado_em: "2024-01-19",
    e_admin: 0,
    ativo: 1,
    pontos: [],
  },
  {
    id: 20,
    nome: "Paul Davis",
    cargo: "gestor",
    nome_de_usuario: "paul.davis",
    email: "paul.davis@example.com",
    senha: "senhastuv",
    celular: "11223344554",
    criado_em: "2024-01-20",
    e_admin: 0,
    ativo: 1,
    pontos: [],
  },
]

export default fakeUsers