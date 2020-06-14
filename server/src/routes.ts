import express from 'express';
import knex from './database/connection';

const routes = express.Router();

//Função para calcular média de estrelas
async function calcularMediaEstrelas(id_estabelecimento: Number) {
    try{
        let avaliacoes = await knex('avaliacao').where('id_estabelecimento', id_estabelecimento).select('estrelas');
        let counter = 0;
        for (let i in avaliacoes) {
            counter += Number(avaliacoes[i].estrelas);
        }
        const qtdeAvaliacoes = avaliacoes.length;
        const media = counter / qtdeAvaliacoes;
        return [media, qtdeAvaliacoes];
    } catch(e) {
        return e;
    }
}

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
    const trx = await knex.transaction();

    try {
        const dadosParaApagar = await trx('caminhoneiros').where('id_caminhoneiros', id).delete();
        //apagando comentarios vinculados
        trx('historico_comentarios').where('id_caminhoneiro', id).delete();
        //apagando avaliacoes vinculadas
        trx('avaliacao').where('id_estabelecimento', id).delete();
        if (!dadosParaApagar) {
            trx.rollback();
            return (response.status(400).json({ message: 'Erro, usuário inexistente!'}));
        };
        trx.commit();
        return (response.status(200).json({ message: 'Cadastro excluído com sucesso!'}));
    } catch (e){
        trx.rollback();
        return ( response.status(400).json({ message: 'Erro na exclusão, tente novamente mais tarde.'}));
    }
});

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
        senha: request.body.senha,
        autenticado: 1,
        img_url: request.body.img_url,
        banho: request.body.banho,
        combustivel: request.body.combustivel,
        raio_dez_km: request.body.raio_dez_km,
        aberto_24h: request.body.aberto_24h,
        refeicao: request.body.refeicao,
        cafe: request.body.cafe,
        saude: request.body.saude
    };
    try {
        await knex('estabelecimentos').insert(dadosCadastro);
        return response.status(200).json({ message: 'Cadastro realizado com sucesso!'});
    } catch (e){
        return ( response.status(400).json({ message: 'Erro no cadastro, por favor tente novamente e verifique seus dados.'}));
    }
});

//LISTAR TODOS OS ESTABELECIMENTOS SEM FILTRO
routes.get('/estabelecimentos-todos', async (request, response) => {
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

//LISTAR TODOS OS DADOS DO ESTABELECIMENTO POR ID AO SELECIONAR NA LISTA
routes.get('/estabelecimento/:id', async (request, response) => {
    let id = Number(request.params.id);
    try {
        const estabelecimentoSelecionado = await knex('estabelecimentos').where('id', id)

        const comentarios = await knex('historico_comentarios').where('id_estabelecimento', id).select('id_caminhoneiro', 'comentario');
        let avaliacoes = await calcularMediaEstrelas(id);

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
                qtdeComentarios: comentarios.length,
                avaliacao: avaliacoes.media,
                qtdeAvaliacoes: avaliacoes.qtdeAvaliacoes
            }
        })
        return (response.status(200).json(serialized));
    } catch (e){
        return ( response.status(400).json({ message: 'Erro na consulta, tente novamente mais tarde.'}));
    }
});

//LISTAR ESTABELECIMENTOS COM FILTROS
routes.get('/estabelecimentos', async (request, response) => {
    //limite de resultados definido na url de busca
    let limite = Number(request.query.limite)
    //offset é para fazer paginação, exemplo, se eu quiser que a busca traga os proximos 4 resultados, coloco offset=4... ele pula os 4 primeiros
    let offset = Number(request.query.offset)

    //parametros da busca
    const params = {
        combustivel: request.query.combustivel,
        aberto_24h: request.query.aberto_24h,
        banho: request.query.banho,
        raio_dez_km: request.query.raio_dez_km,
        wifi: request.query.wifi,
        estacionamento: request.query.estacionamento,
        refeicao: request.query.refeicao,
        cafe: request.query.cafe,
        banheiro:request.query.banheiro,
        saude: request.query.saude
    }
    try {
        const estabelecimentosFiltrados = await knex('estabelecimentos').where(params).limit(limite).offset(offset);
        if(!estabelecimentosFiltrados) {
            return (response.status(400).json({ message: 'Erro, estabelecimento inexistente!'}));
        }
        let serializedToEdition: any = [];
        const estabLength = estabelecimentosFiltrados.length;
        estabelecimentosFiltrados.map(async (item, index) => {
            let avaliacoes = await knex('avaliacao').where('id_estabelecimento', item.id).select('estrelas');
            let counter = 0;
            for (let i in avaliacoes) {
                counter += Number(avaliacoes[i].estrelas);
            }
            const qtdeAvaliacoes = Number(avaliacoes.length);
            const media = counter / qtdeAvaliacoes;
            serializedToEdition.push({
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
                media: media,
                qtdeAvaliacoes: qtdeAvaliacoes
            });
            if (estabLength == index + 1) {
                return (response.status(200).json(serializedToEdition));
            }
        });
    } catch (e){
        return ( response.status(400).json({ message: 'Erro na consulta, tente novamente mais tarde.'}));
    }
});

//APAGAR ESTABELECIMENTO
routes.delete('/estabelecimento/:id', async (request, response) => {
    let id = request.params.id;
    const trx = await knex.transaction();

    try {
        //apagando estabelecimento
        const dadosParaApagar = await trx('estabelecimentos').where('id', id).delete();
        //apagando comentarios vinculados
        trx('historico_comentarios').where('id_estabelecimento', id).delete();
        //apagando avaliacoes vinculadas
        trx('avaliacao').where('id_estabelecimento', id).delete();
        
        if (!dadosParaApagar) {
            trx.rollback();
            return (response.status(400).json({ message: 'Estabelecimento inexistente!'}));
        };
        trx.commit();
        return (response.status(200).json({ message: 'Cadastro excluído com sucesso!'}));
    } catch (e){
        trx.rollback();
        return ( response.status(400).json({ message: 'Erro na exclusão, tente novamente mais tarde.'}));
    }
});

//LISTAR ESTABELECIMENTOS PRÓXIMOS

//ATUALIZAR DADOS ESTABELECIMENTO
routes.put('/estabelecimento/:id', async (request, response) => {
    let id = request.params.id;
    
    const dadosUpdate = {
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
        modified: new Date(),
        senha: request.body.senha,
        autenticado: 1
    };
    try {
        const dados = await knex('estabelecimentos').where('id', id).update(dadosUpdate);
        if (!dados) {
            return response.status(400).json({ erro: 'cadastro inexistente'});
        }
        
    } catch (e){
        return ( response.status(400).json({ message: 'Erro na atualização, por favor tente novamente e verifique seus dados.'}));
    }
    return response.status(200).json({ message: 'Alterações realizadas com sucesso!'});
});

//EXCLUIR CONTA ESTABELECIMENTO

export default routes;