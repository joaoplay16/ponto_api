import session from "express-session"
import { UsuarioSemSenha } from "./usuario"
declare module "express-session" {
  interface SessionData {
    usuario: UsuarioSemSenha
  }
}
