import {randomBytes, scryptSync} from "crypto"

function criaHashEsalSenha(senhaDigitada) {

    const salSenha = randomBytes(16).toString("hex");
    const hashSenha = scryptSync(senhaDigitada, salSenha, 64).toString("hex");

    return {salSenha, hashSenha};
}

export default criaHashEsalSenha;