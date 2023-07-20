require('dotenv').config();
const express = require('express');
const cors = require('cors')
const dbConnection = require('./confiq/db');
const router = require('./routes');
const app = express();
const path = require('path');

dbConnection();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(router);


app.listen(8000);