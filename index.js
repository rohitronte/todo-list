const express = require('express');

const port = 8000;
const app = express();


app.set('view engine','ejs');
app.set('views', './views');

app.use(express.json());
// redirecting all routes to ./routes/index.js
app.use('/',require('./routes/index'));

// using static files
app.use(express.static('assets'));
// app.use(express.static('./node_modules/split.js'));

app.listen(port , function(error){
    if(error){
        console.log("server not running ");
    }
    console.log("server is running on port : ", port);
});