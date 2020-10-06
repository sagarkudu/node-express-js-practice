function log(req, res, next) {
    console.log("Logger 2- in custom file"); //req.body
    next();
}

module.exports = log;

/** This middleware function parses the request body 
 * and repair the json object it will set 'req.body' and it will pass the control to next middleware function. */