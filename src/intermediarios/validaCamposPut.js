const validaCamposPut = (req, res, next) => {

    const { nome, dataNascimento, celular, email, senha } = req.body;
    
    if (!nome) {
        return res.status(400).json({mensagem: 'Informe um nome.'});
    }
    if (!dataNascimento) {
        return res.status(400).json({mensagem: 'Informe uma data de nascimento.'});
    }
    if (!celular) {
        return res.status(400).json({mensagem: 'Informe um número de celular.'});
    }
    if (!email) {
        return res.status(400).json({mensagem: 'Informe um email.'});
    }
       if (!senha) {
        return res.status(400).json({mensagem: 'Informe uma senha.'});
    }
    next();

}

module.exports = {
    validaCamposPut
}