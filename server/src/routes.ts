import express from 'express';
import knex from './database/connection'

const routes = express.Router();

routes.get('/caminhoneiro', async (request, response) => {
        const userData = await knex('caminhoneiros').select('*');

        // const serialized = userData.map(motorista => {
        //    return { 
        //        nome: motorista.nome,
        //        email: motorista.email
        //    };
        // });
        return (response.send('teste'));

});

export default routes;