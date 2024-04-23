
import registrarEventoDocument from "./registrarEventos/registrarEventosDocumento.js";
import registrarEventosInicio from "./registrarEventos/registrarEventosInicio.js";
import io from "./servidor.js";

io.on("connection", (socket) => {

  registrarEventosInicio(socket, io)
  registrarEventoDocument(socket, io)

});
