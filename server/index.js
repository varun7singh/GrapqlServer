const express = require('express');
const c = require('colors');
require('dotenv').config();
const connectDatabase = require('./config/db');
const port = process.env.PORT ||  5000;
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

connectDatabase();
const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`.bgGreen.white);
});