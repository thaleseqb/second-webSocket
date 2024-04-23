
import registrarEventosCadastro from "./registrarEventos/cadastro.js";
import registrarEventoDocument from "./registrarEventos/documento.js";
import registrarEventosInicio from "./registrarEventos/inicio.js";
import io from "./servidor.js";

io.on("connection", (socket) => {

  registrarEventosInicio(socket, io)
  registrarEventoDocument(socket, io)
  registrarEventosCadastro(socket, io)

});
