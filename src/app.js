// MODULES
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

// Initializations
const app = express();
const productRoute = require('./routes/product');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    port: 3306,
    database: 'project_nodejs_mysql'
}, 'single'));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', productRoute);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Starting Server
app.listen(app.get('port'), () => {
    console.log('Server on port:', app.get('port'));
});