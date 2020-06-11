import express, { response } from 'express';

const app = express();

app.get('/users', (request, response) => {
    
    response.json();
});


app.listen(2222);