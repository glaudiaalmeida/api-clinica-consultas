const validaSenha = (req, res, next) => {

const { cnes_consultorio, senha_consultorio } = req.query;

    if (cnes_consultorio != "1001" || senha_consultorio != "healt@healtcare.com.br") {
        return res.status(401).json({mensagem:'Cnes ou senha inválidos!'});
    }

    next(); 
    }

module.exports = {
    validaSenha
}