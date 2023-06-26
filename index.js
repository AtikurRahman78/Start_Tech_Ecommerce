require('dotenv').config();
const express = require('express');
const cors = require('cors')
const dbConnection = require('./confiq/db');
const router = require('./routes');
const app = express();

dbConnection();
app.use(cors());
app.use(express.json());
app.use(router);


app.listen(8000);