const { consultorio, paciente, consultas, consultasFinalizadas, laudos } = require('../bancodedados');

let identificadorProximaConsulta = 1;
let identificadorProximoLaudo = 1;

//GET - LISTAR CONSULTAS
const listarTodasConsultas = (req, res) => {
   
    if (consultas.length === 0) {
        return res.status(204).json({mensagem:'Nenhuma consulta encontrada'});
    } 
    return res.json(consultas);
}
//POST - CRIAR CONSULTA
const criarConsultas = (req, res) => { 
    const { tipoConsulta, paciente, valorConsulta, nome, cpf, dataNascimento, celular, email, senha } = req.body;
   
    if (!tipoConsulta) {
        return res.status(400).json({mensagem: 'Informe a especialidade.'});
    }
    
    const medicoComEspecialidade = consultorio.medicos.find(medico => medico.especialidade === tipoConsulta);
    if (!medicoComEspecialidade) {
        return res.status(400).json({mensagem:'Não temos essa especialidade nesta clinica!'});
    }

    if (typeof valorConsulta != "number") {
        return res.status(400).json({mensagem: 'Informe um valor válido.'});
    }
    
    const novaConsulta = {
            "identificador": identificadorProximaConsulta,
            tipoConsulta,
            "identificadorMedico": medicoComEspecialidade.identificador,
            "finalizada": false,
            valorConsulta,
            "paciente": paciente
        }
    consultas.push(novaConsulta);
    identificadorProximaConsulta++;
    return res.status(201).json({mensagem: 'Cliente cadastrado com sucesso.'});
};

//PUT - ATUALIZAR CONSULTA
const atualizarConsultas = (req, res) => {  

    const { identificador } = req.params;
    const {nome, cpf, dataNascimento, celular, email, senha } = req.body;

    const consultaEncontrada = consultas.find(consulta => consulta.identificador === Number(identificador));

    if (!consultaEncontrada) {
        return res.status(404).json({mensagem:'Essa consulta não existe ou não esta aberta.'});
    }
   
    if (consultaEncontrada.finalizada) {
        return res.status(400).json({mensagem: 'Esta consulta não pode ser alterada, pois está finalizada.'});
    }
   
    consultaEncontrada.paciente.nome = nome;
    consultaEncontrada.paciente.cpf = cpf;
    consultaEncontrada.paciente.dataNascimento = dataNascimento;
    consultaEncontrada.paciente.celular = celular;
    consultaEncontrada.paciente.email = email;
    consultaEncontrada.paciente.senha = senha;

    return res.status(201).json({mensagem: 'Cadastro da consulta atualizado.'});
};

//POST - /consulta/finalizar - FINALIZAR UMA CONSULTA COM UM TEXTO DE LAUDO VÁLIDO E DEFINIR COM FINALIZADA
//INSERIR no array consultasFinalizadas.push(aqui todas  as propriedades do objeto) - colocar pra dentro de um array 
const finalizarConsulta = (req, res) =>  {
    const { identificadorConsulta, textoMedico } = req.body;

    if (!identificadorConsulta) {
        return res.status(400).json({mensagem: 'Informe o identificador da consulta.'});
    }
    if (!textoMedico) {
        return res.status(400).json({mensagem: 'Informe o laudo.'});
    }
    if (textoMedico.length <= 0 || textoMedico.length > 200) {
        return res.status(400).json({mensagem: 'O tamanho do textoMedico não está dentro do esperado.'});
    }
    const consultaEncontrada = consultas.find(consulta => consulta.identificador === identificadorConsulta);

    
    if (!consultaEncontrada) {
        return res.status(404).json({mensagem:'Essa consulta não existe ou não esta aberta.'});
    }
    
    consultaEncontrada.finalizada = true;
    consultaEncontrada.identificadorLaudo = identificadorProximoLaudo;
    consultaEncontrada.textoMedico = textoMedico;
  
    consultasFinalizadas.push(consultaEncontrada);

    laudos.push(consultaEncontrada);
   
    identificadorProximoLaudo++;    

    //return res.json(consultasFinalizadas);
    //   return res.json(laudos);
};

//DELETAR CONSULTA
const deletarConsulta = (req, res) =>  {
    const { identificadorConsulta } = req.params;
    console.log(identificadorConsulta);
    const consultaEncontrada = consultas.find(consulta => consulta.identificadorConsulta === Number(identificadorConsulta));
    console.log(consultaEncontrada);//undefined
    if (!consultaEncontrada) {
        return res.status(404).json({mensagem:'Essa consulta não existe ou não esta aberta.'});
    }
    if (!consultaEncontrada.finalizada) { //AQUI ESTOU DIZENDO QUE È TRUE?
        return res.status(400).json({mensagem: 'A consulta só pode ser removida se a mesma estiver finalizada.'});
    }
    const indiceConsulta = consultas.findIndex(consulta => consulta.identificador === Number(identificador));

    consultas.splice(indiceConsulta, 1);

    return res.status(201).json();
};


//GET - /consulta/laudo?identificador_consulta=1&senha=1234
        // RETORNAR INFORMAÇÕES DO LAUDO 
const mostrarLaudo = (req, res) =>  {
    const { identificador_consulta, senha } = req.params;

    if (!identificador_consulta) {
        return res.status(400).json({mensagem: 'Informe o identificador da consulta.'});
    }

    const consultaEncontrada = consultas.find(consulta => consulta.identificadorConsulta === Number(identificador_consulta));
    console.log(consultaEncontrada);
    if (!senha) {
        return res.status(400).json({mensagem: 'Informe a senha.'});
    }
    const senhaConfere = consultaEncontrada.find(consulta => consulta.senha === senha);
    if (!senhaConfere) {
        return res.status(404).json({mensagem: 'A senha não confere.'})
    }
    
    if (!consultaEncontrada) {
        return res.status(400).json({mensagem: 'Consulta médica não encontrada.'});
    }
  
    return res.json(consultasFinalizadas);
    //VERIFICAR SE EXISTE UM LAUDO PARA ESTA CONSULTA - NO BODY O LAUDO SE CHAMA "textoMedico"
    //EXIBIR O LAUDO JUNTO COM DADOS MEDICO E PACIENTE - ARRAY COM TODAS INFORMAÇÕES
};

//GET - /consultas/medico?identificador_medico=1
//RETORNAR TODAS AS CONSULTAS DO MESMO MÉDICO
const mostrarConsultaPorMedico = (req, res) =>  {
    const { identificador_medico } = req.query;
  
    if (!identificador_medico) {
        return res.status(400).json({mensagem: 'Informe o identificador do médico.'});
    }
    const medicoExiste = consultorio.medicos.find
                    (medico => medico.identificador === Number(identificador_medico));

    if (!medicoExiste) {
        return res.status(404).json({mensagem:'O médico informado não existe na base.'});
    }

    const consultasMedico= consultas.filter(consulta => consulta.identificadorMedico === Number(identificador_medico));
     
    return res.json(consultasMedico);
};

module.exports = {
    listarTodasConsultas,
    criarConsultas,
    atualizarConsultas,
    deletarConsulta,
    finalizarConsulta,
    mostrarLaudo,
    mostrarConsultaPorMedico
}