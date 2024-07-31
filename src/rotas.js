const express = require('express');

const { criarConsultas, listarTodasConsultas, atualizarConsultas, deletarConsulta, finalizarConsulta, mostrarLaudo, mostrarConsultaPorMedico } = require('./controladores/consultas');

const { validaSenha } = require('./intermediarios/validaSenha');
const { validaCpfEmailPost } = require('./intermediarios/validaCpfEmailPost');
const { validaCpfEmailPut } = require('./intermediarios/validaCpfEmailPut');
const { validaCamposPost } = require('./intermediarios/validaCamposPost');
const { validaCamposPut } = require('./intermediarios/validaCamposPut');


const rotas = express();

rotas.get('/consultas', validaSenha, listarTodasConsultas);
rotas.post('/consultas', validaSenha, validaCpfEmailPost, validaCamposPost, criarConsultas);
rotas.put('/consultas/:identificador', validaSenha, validaCpfEmailPut, validaCamposPut, atualizarConsultas);
rotas.delete('/consultas/:identificadorConsulta', validaSenha, deletarConsulta);
rotas.post('/consultas/finalizar', validaSenha, finalizarConsulta);
rotas.get('/consultas/mostrarLaudo', validaSenha, mostrarLaudo);
rotas.get('/consultas/listarMedico', mostrarConsultaPorMedico);


module.exports = rotas;