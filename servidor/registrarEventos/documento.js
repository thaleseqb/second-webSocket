import {
    atualizaDocumento,
    encontrarDocumento,
    excluirDocumento,
  } from "../db/documentosDb.js";
import { EncontrarConexao, adicionarConexao, obterUsuarioDocumento, removerConexao } from "../utils/conexoesDocumentos.js";


function registrarEventoDocument(socket, io) {
    socket.on("selecionar_documento", async ({nomeDocumento, nomeUsuario}, devolverTexto) => {
      
      const documento = await encontrarDocumento(nomeDocumento);
      
      if (documento) {
          const conexaoEncontrada = EncontrarConexao(nomeDocumento, nomeUsuario);

          if (!conexaoEncontrada) {
            socket.join(nomeDocumento);
            
            adicionarConexao({nomeDocumento, nomeUsuario});

            socket.data = {
              usuarioEntrou: true,
            }

            const usuariosNoDocumento = obterUsuarioDocumento(nomeDocumento);
  
            io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento);
  
            devolverTexto(documento.texto);
          } else {
            socket.emit("usuario_ja_encontrado")
          }
        }

        socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
          const atualizacao = await atualizaDocumento(nomeDocumento, texto);
      
          if (atualizacao.modifiedCount) {
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
          }
        });
    
        socket.on("excluir_documento", async (nome) => {
          const resultado = await excluirDocumento(nome);
      
          if (resultado.deletedCount) {
            io.emit("excluir_documento_sucesso", nome);
          }
        });

        socket.on("disconnect", () => {

          if (socket.data.usuarioEntrou) {
            removerConexao(nomeDocumento, nomeUsuario)
            const usuariosNoDocumento = obterUsuarioDocumento(nomeDocumento);
  
            io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento);
          }
        })
      }
    );
}

export default registrarEventoDocument;