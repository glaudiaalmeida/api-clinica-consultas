module.exports = {

    consultorio: {
      nome: 'Healthcare',
      identificador: 1,
      cnes: '1001',
      senha: 'health@healtcare.com.br',
      medicos: [
        {
          identificador: 1,
          nome: 'João Souza',
          especialidade: 'GERAL',
        },
        {
          identificador: 2,
          nome: 'Irineu Alves',
          especialidade: 'ODONTOLOGIA',
        },
      ]
    },
    consultas: [
      // array de consultas médicas
    ],
    consultasFinalizadas: [
      // array de consultas finalizadas
    ],
    laudos: [
      // array de laudos médicos
    ]
  }