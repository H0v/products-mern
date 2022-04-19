const express = require('express');
const { urlencoded } = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { connectToDb } = require('./db/db');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(urlencoded({ extended: true, limit: "15mb" }));
app.use(authJwt());
app.use((err, req, res, next) => errorHandler(err, req, res, next));
app.use(bodyParser.json());

app.use('/products', require('./routes/Products'));
app.use('/auth', require('./routes/Auth'));

app.listen(8080, async () => {
    await connectToDb();
    console.log('Server is running...')
});