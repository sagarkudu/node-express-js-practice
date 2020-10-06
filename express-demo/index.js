const Joi = require('joi'); //J capital because it returns a class and should be on top
const config = require('config');
const debug = require('debug') ('app:startup');

const express = require('express'); //'express' returns a function so save it as const express 
const app = express(); //calling this function express, returns an object say app here

//importing custom middleware
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');

//adding middleware 
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(express.static('public')); //add static content here
app.use('/api/courses', courses); //any path that start with /api/courses should use courses router
app.use('/', home); //any path that start with / should use home router

app.use(function (req, res, next) {
    console.log('Logging...');
    next(); //this is pass control to next middleware function in the pipeline
})
app.use(logger);

//adding debug, one should add debug instead of console.log
debug('Morgan enabled...');

// Configuration
console.log('Application Name: ' +config.get('name'));
console.log('Mail server Name: ' +config.get('mail.host'));

//adding environment variable
const port = process.env.PORT || 3000

//listening a server
app.listen(port, () => console.log(`Listening on port ${port}...`));