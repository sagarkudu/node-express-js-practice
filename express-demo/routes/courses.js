
const express = require('express');
const router = express();

//lets define array for courses
const courses = [
    { id:1, name: 'course1'},
    { id:2, name: 'course2'},
    { id:3, name: 'course3'}
];

//note we have '/api/courses' at all endpoints,we can replace it '/' as we already in app.use('/api/courses', courses); so we can code more clear
// router.get('/api/courses', (req, res) => {
//     res.send([courses]);
// });

//endpoint-2 returning a array
router.get('/', (req, res) => {
    res.send([courses]);
});

router.post('/', (req, res) => {
    //if not exist return 404 error
    const { error } = validateCourse(req.body); //this target method has 2 properties, 'error,value', using es6 and object destructuring
    if(error ) return res.status(400).send(error.message); //400 Bad Request

    //creating course object
    const course = {
        id: courses.length + 1,
        name: req.body.name //here we are assuming in request body we have object and that object have name property
    };

    //next pushing it to array
    courses.push(course);
    res.send(course); //by convention when server creates a new object/resourse it should return in body of response.
});

//adding query string parameters(writing logic for given specific id)
router.get('/:id', (req, res) => {

    //id returns string so we need to parse to int.
    const course = courses.find(c => c.id === parseInt(req.params.id)); 

    if(!course) return res.status(404).send('Oops! The course with the given ID was not found!');
});

router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found!');
    
    //if not exist return 404 error
    const { error } = validateCourse(req.body); //this target method has 2 properties, 'error,value', using es6 and object destructuring

    if(error) return res.status(400).send(error.message); //400 Bad Request

    //update course
    //return the updated course
    course.name = req.body.name;
    res.send(course);
});

router.delete('/:id', (req, res) => {
    //look or find the course
    const course = courses.find(c => c.id === parseInt(req.params.id));

    //not exist, return 404
    if (!course) return res.status(404).send('The course with the given ID was not found!');
    
    //Delete the course, first find its index of course
    const index = courses.indexOf(course);
    courses.splice(index, 1); //removes 1 object from array

    //Return the same course
    res.send(course);
});

function  validateCourse(course) {
    const schema = Joi.object( {name: Joi.string().min(3).required()} );
    return  schema.validate(course);
}

module.export = router;