// assign express library to a variable express
const express = require('express');

// assign the express library as a function to varaible app
const app = express();

// assign port
const port = 3000;

// listen to port 3000
app.listen(port, () => {
    console.log('listening at port 3000');
})

// app use express static method to host static files
app.use(express.static('public'));

// app use express json method to parse json data, included 1mb limit
app.use(express.json( { limit: '1mb' } ));

// assign nedb library to a variable Datastore
const Datastore = require('nedb');

// create new database.db file
const database = new Datastore('database.db');

// load database
database.loadDatabase();

// app express get route method on /api endpoint
app.get('/api', (request, response) => {

    // find all in database
    database.find( {}, (err, data) => { // callback accepts two parameters err and data
        
        // if err end response
        if (err) {
            response.end();
            return;
        }
        // else return data from database
        response.json(data);
    })
    
});

// app express post route method on /api enpoint
app.post('/api', (request, response) => {

    // assign the body of request to data
    const data = request.body;

    // create timestamp variable
    const timestamp = Date.now();

    // assign timestamp into data
    data.timestamp = timestamp;
    
    // insert data into database
    database.insert(data);

    // send response back as json with lat and lon
    response.json(data);
});

