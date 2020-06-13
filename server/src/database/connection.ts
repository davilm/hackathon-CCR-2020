import knex from 'knex';

const connection = knex({
    client: 'mysql',
    connection: {
        host: '108.179.193.185',
        user: 'hafne367_hackath',
        password: 'Hackathon_2020',
        database: 'hafne367_hackathon2020'
    },
    useNullAsDefault: true
});

export default connection;