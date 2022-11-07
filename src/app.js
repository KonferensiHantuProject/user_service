const express = require('express');
const methodOverride = require('method-override');

// Env
require('dotenv').config();

// Connection
require('./config/db');

const app = express();

// Set up method override
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Seperate Route
const auth_route = require('./api/routes/user-routes');
app.use('/users', auth_route);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Jalan di http://localhost:${PORT}`)
});