var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routerClient = require('./routes/client');
const routerDashboard = require('./routes/dashboard');
const routerAdmin = require('./routes/admin');
const routerRapport = require('./routes/rapport');
const cors = require('cors');
const methodOverride = require('method-override');
const serveStatic = require('serve-static');
const path = require('path');


// connection 
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/gthconsult', {useNewUrlParser : true, useUnifiedTopology : true});


// configure the app to use bodyParser() and cros
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride('_method'));


// pour les route
app.use('/', serveStatic(path.join(__dirname, '/dist')));
app.use('/api/v1/clients', routerClient);
app.use('/api/v1/admins', routerAdmin);
app.use('/api/v1/dashboard', routerDashboard);
app.use('/api/v1/files', routerRapport);


// pour afficher les erreur
app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);
    res.status(500).json({
        message : 'warnning'
    })
})



// pour declanche le serveur
app.listen(3000, () => {
    console.log(`Server Running`);
})