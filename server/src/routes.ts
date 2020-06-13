import express from 'express';
import knex from './database/connection';
import { Request, Response } from 'express';

const routes = express.Router();

//LISTAR TODOS OS CAMINHONEIROS
routes.get('/listar-caminhoneiros', async (request, response) => {
        const userData = await knex('caminhoneiros').select('*');

        const serialized = userData.map(motorista => {
           return { 
               email: motorista.email,
               nome: motorista.nome
           };
        });
        return (response.json(serialized));

});

//FAZER LOGIN
routes.post('/autenticar', async (request, response) => {
    const dadosLogin = {
        email: request.body.email,
        senha: request.body.senha
    };

    const dadosBanco = await knex('caminhoneiros').select('email', 'senha').where('email', String(dadosLogin.email).trim()).first();
    if (!dadosBanco) {
        return response.status(400).json({ 
            message: 'Desculpe, este email não está cadastrado!',
            autenticado: false
    });
    }
    else if (String(dadosBanco.senha).trim() == String(dadosLogin.senha).trim()) {
        try{
            await knex('caminhoneiros').where('email', String(dadosLogin.email).trim()).update({ autenticado: 1})
        } catch(e) {
            return ( response.json({ erro: 'Lamentamos, houve um erro: ' + e }));
        }
        return response.status(200).json({ 
            message: 'Login efetuado com sucesso!!',
            autenticado: true 
        });
    }
    else {
        return response.status(400).json({ message: 'Senha inválida!', autenticado: false });
    }
});

//CADASTRAR CAMINHONEIRO
routes.post('/cadastro-caminhoneiro', async (request, response) => {
    const dadosCadastro = {
        nome: request.body.nome, 
        email: request.body.email, 
        endereco: request.body.endereco, 
        cidade: request.body.cidade, 
        cpf: request.body.cpf, 
        cep: request.body.cep, 
        uf: request.body.uf, 
        ddd: request.body.ddd, 
        celular: request.body.celular, 
        antt: request.body.antt, 
        descricao: request.body.descricao, 
        created: new Date(), 
        modified: null,
        senha: request.body.senha,
        autenticado: 0
    };
    try {
        await knex('caminhoneiros').insert(dadosCadastro);
        return response.status(200).json({ message: 'Cadastro realizado com sucesso!'});
    } catch (e){
        return ( response.json({ message: 'Erro no cadastro, por favor tente novamente e verifique seus dados.'}));
    }
});

export default routes;