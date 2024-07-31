const validaCamposPost = (req, res, next) => {

    const { paciente } = req.body;
    
    if (!paciente.nome) {
        return res.status(400).json({mensagem: 'Informe um nome.'});
    }
    if (!paciente.dataNascimento) {
        return res.status(400).json({mensagem: 'Informe uma data de nascimento.'});
    }
    if (!paciente.celular) {
        return res.status(400).json({mensagem: 'Informe um número de celular.'});
    }
    if (!paciente.email) {
        return res.status(400).json({mensagem: 'Informe um email.'});
    }
       if (!paciente.senha) {
        return res.status(400).json({mensagem: 'Informe uma senha.'});
    }
    next();

}

module.exports = {
    validaCamposPost
}