const conexoesDocumentos = [];

function adicionarConexao(conexao) {
    conexoesDocumentos.push(conexao)
}

function obterUsuarioDocumento(nomeDocumento) {
    return conexoesDocumentos
        .filter((conexao) => conexao.nomeDocumento === nomeDocumento)
        .map((conexao) => conexao.nomeUsuario);
}

export { adicionarConexao, obterUsuarioDocumento }