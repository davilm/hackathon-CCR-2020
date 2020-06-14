import express from 'express';
import knex from './database/connection';

const routes = express.Router();

//LISTAR TODOS OS CAMINHONEIROS
routes.get('/listar-caminhoneiros', async (request, response) => {
        const userData = await knex('caminhoneiros').select('*');

        // const serialized = userData.map(motorista => {
        //    return { 
        //        email: motorista.email,
        //        nome: motorista.nome
        //    };
        // });
        return (response.json(userData));

});

//HOME (Será montado no front)

//FAZER LOGIN
routes.post('/autenticar', async (request, response) => {
    const dadosLogin = {
        cpfCnpj: String(request.body.cpfCnpj).split('.').join("").replace('-','').replace('/','').trim(),
        senha: request.body.senha
    };
    let dadosBanco;
    let tipo = dadosLogin.cpfCnpj.length == 11 ? 'caminhoneiro' : dadosLogin.cpfCnpj.length == 14 ? 'estabelecimento' : '';

    switch (tipo) {
        case 'caminhoneiro':
            dadosBanco = await knex('caminhoneiros').select('cpf', 'senha').where('cpf', dadosLogin.cpfCnpj).first();
            break;
        case 'estabelecimento':
            dadosBanco = await knex('estabelecimentos').select('cnpj', 'senha').where('cnpj', dadosLogin.cpfCnpj).first();
            break;
        default:
            return response.status(400).json({ message: 'cadastro inválido', autenticado: false });
            break;
        }
    
    if (!dadosBanco) {
        return response.status(400).json({ 
            message: `Desculpe, este ${ tipo == 'caminhoneiro' ? 'cpf' : 'cnpj'} não está cadastrado!`,
            autenticado: false
        });
    }
    else if (String(dadosBanco.senha).trim() == String(dadosLogin.senha).trim()) {
        try{
            await knex('caminhoneiros').where(`${ tipo == 'caminhoneiro' ? 'cpf' : 'cnpj'}`, dadosLogin.cpfCnpj).update({ autenticado: 1})
        } catch(e) {
            return ( response.status(500).json({ erro: 'Lamentamos, houve um erro: ' + e }));
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
        autenticado: 1
    };
    try {
        await knex('caminhoneiros').insert(dadosCadastro);
        return response.status(200).json({ message: 'Cadastro realizado com sucesso!'});
    } catch (e){
        return ( response.status(400).json({ message: 'Erro no cadastro, por favor tente novamente e verifique seus dados.'}));
    }
});

//ATUALIZAR DADOS CAMINHONEIRO
routes.put('/caminhoneiro/:id', async (request, response) => {
    let id = request.params.id;
    
    const dadosUpdate = {
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
        senha: request.body.senha,
        autenticado: 1
    };
    try {
        const dados = await knex('caminhoneiros').where('id_caminhoneiros', id).update(dadosUpdate);
        if (!dados) {
            return response.status(400).json({ erro: 'usuário inexistente'});
        }

    } catch (e){
        return ( response.status(400).json({ message: 'Erro na atualização, por favor tente novamente e verifique seus dados.'}));
    }
    return response.status(200).json({ message: 'Alterações realizadas com sucesso!'});
});

//SELECIONAR CAMINHONEIRO POR ID
routes.get('/caminhoneiro/:id', async (request, response) => {
    let id = request.params.id;

    try {
        const userData = await knex('caminhoneiros').where('id_caminhoneiros', id).select('*');
        return (response.status(200).json(userData));
    } catch (e){
        return ( response.status(400).json({ message: 'Erro na consulta, tente novamente mais tarde.'}));
    }
});

//EXCLUIR CONTA CAMINHONEIRO
routes.delete('/caminhoneiro/:id', async (request, response) => {
    let id = request.params.id;

    try {
        const userData = await knex('caminhoneiros').where('id_caminhoneiros', id).delete();
        if (!userData) {
            return (response.status(400).json({ message: 'Erro, usuário inexistente!'}));
        };
        return (response.status(200).json({ message: 'Cadastro excluído com sucesso!'}));
    } catch (e){
        return ( response.status(400).json({ message: 'Erro na exclusão, tente novamente mais tarde.'}));
    }
});


//CRIAR TABELA COMENTARIOS COM RELACAO CAMINHONEIROS / ESTABELECIMENTOS
//

//CRIAR TABELA AVALIACOES COM RELACAO CAMINHONEIROS / ESTABELECIMENTOS

//CADASTRAR ESTABELECIMENTO
routes.post('/cadastro-estabelecimento', async (request, response) => {
    const dadosCadastro = {
        nome: request.body.nome, 
        email: request.body.email, 
        endereco: request.body.endereco, 
        cidade: request.body.cidade, 
        cnpj: request.body.cnpj, 
        cep: request.body.cep, 
        uf: request.body.uf, 
        ddd: request.body.ddd, 
        celular: request.body.celular, 
        wifi: request.body.wifi, 
        banheiro: request.body.banheiro, 
        estacionamento: request.body.estacionamento, 
        descricao: request.body.descricao, 
        created: new Date(), 
        modified: null,
        senha: request.body.senha,
        autenticado: 1
    };
    try {
        await knex('estabelecimentos').insert(dadosCadastro);
        return response.status(200).json({ message: 'Cadastro realizado com sucesso!'});
    } catch (e){
        return ( response.status(400).json({ message: 'Erro no cadastro, por favor tente novamente e verifique seus dados.'}));
    }
});

//LISTAR TODOS OS ESTABELECIMENTOS
routes.get('/estabelecimentos', async (request, response) => {
    try {
        const todosEstabelecimentos = await knex('estabelecimentos');

        if(!todosEstabelecimentos) {
            return ( response.status(400).json({ message: 'Não há estabelecimentos cadastrados no momento.'}));
        }
        return response.status(200).json(todosEstabelecimentos);
    } catch (e){
        return ( response.status(400).json({ message: 'Erro na listagem de estabelecimentos.'}));
    }

});

//LISTAR DADOS DO ESTABELECIMENTO POR ID AO SELECIONAR NA LISTA
routes.get('/estabelecimento/:id', async (request, response) => {
    let id = request.params.id;
    try {
        const estabelecimentoSelecionado = await knex('estabelecimentos').where('id', id)

        const comentarios = await knex('historico_comentarios').where('id_estabelecimento', id).select('id_caminhoneiro', 'comentario');
        let avaliacoes = await knex('avaliacao').where('id_estabelecimento', id).select('estrelas');
        let counter = 0;
        for (let i in avaliacoes) {
            counter += Number(avaliacoes[i].estrelas);
        }
        const qtdeComentarios = avaliacoes.length;
        const media = counter / qtdeComentarios;

        if(!estabelecimentoSelecionado) {
            return (response.status(400).json({ message: 'Erro, estabelecimento inexistente!'}));
        }
        const serialized = estabelecimentoSelecionado.map(item => {
            return {
                id_estabelecimento: item.id,
                img_url: String(item.img_url).split(','),  //split() pra separar por vírgula e montar uma array
                endereco: item.endereco,
                cep: String(item.cep).replace(/^(\d{2})(\d{3})(\d{3}).*/, '$1.$2-$3'), //Regex pra colocar mascara no cep
                combustivel: item.combustivel,
                aberto_24h: item.aberto_24h,
                banho: item.banho,
                raio_dez_km: item.raio_dez_km,
                wifi: item.wifi,
                estacionamento: item.estacionamento,
                refeicao: item.refeicao,
                cafe: item.cafe,
                banheiro:item.banheiro,
                saude: item.saude,
                comentarios: comentarios,
                avaliacao: media,
                quantidade_comentarios: qtdeComentarios
            }
        })
        return (response.status(200).json(serialized));
    } catch (e){
        return ( response.status(400).json({ message: 'Erro na consulta, tente novamente mais tarde.'}));
    }
});

//LISTAR ESTABELECIMENTOS PRÓXIMOS

//ATUALIZAR DADOS ESTABELECIMENTO

//EXCLUIR CONTA ESTABELECIMENTO

export default routes;