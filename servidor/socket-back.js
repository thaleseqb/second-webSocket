import "dotenv/config";

import registrarEventosCadastro from "./registrarEventos/cadastro.js";
import registrarEventoDocument from "./registrarEventos/documento.js";
import registrarEventosInicio from "./registrarEventos/inicio.js";
import registrareventosLogin from "./registrarEventos/login.js";
import io from "./servidor.js";
import autorizarUsuario from "./middlewares/autorizarUsusario.js";

const nspUsuarios = io.of("/usuarios");

nspUsuarios.use(autorizarUsuario);

nspUsuarios.on("connection", (socket) => {
  
  registrarEventosInicio(socket, nspUsuarios);
  registrarEventoDocument(socket, nspUsuarios);

})

io.of("/").on("connection", (socket) => {

  registrarEventosCadastro(socket, io);
  registrareventosLogin(socket, io);

});
