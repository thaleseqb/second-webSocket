import "dotenv/config";

import registrarEventosCadastro from "./registrarEventos/cadastro.js";
import registrarEventoDocument from "./registrarEventos/documento.js";
import registrarEventosInicio from "./registrarEventos/inicio.js";
import registrareventosLogin from "./registrarEventos/login.js";
import io from "./servidor.js";

io.on("connection", (socket) => {

  registrarEventosCadastro(socket, io);
  registrareventosLogin(socket, io);
  registrarEventosInicio(socket, io);
  registrarEventoDocument(socket, io);

});
