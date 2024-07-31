
const { consultorio, paciente, consultas, consultasFinalizadas, laudos } = require('../bancodedados');

const validaCpfEmailPost = (req, res, next) => {
    
    const { paciente: {cpf, email} } = req.body;
            
    if (!cpf) {
        return res.status(400).json({mensagem: 'Informe um cpf.'});
    }
    if (cpf.length != 11 ) {
        return res.status(400).json({mensagem: 'Informe um cpf válido.'});
    }

    const cpfExiste = consultas.find(consulta => consulta.paciente.cpf === cpf);

    if (cpfExiste) {
        return res.status(400).json({mensagem: 'Já existe uma consulta em andamento com o cpf informado!'});
    }

    const emailExiste = consultas.find(consulta => consulta.paciente.email === email);

    if (emailExiste) {
        return res.status(400).json({mensagem: 'Já existe uma consulta em andamento com o email informado!'});
    }

    next(); 
  }
    
    module.exports = {
        validaCpfEmailPost
    }