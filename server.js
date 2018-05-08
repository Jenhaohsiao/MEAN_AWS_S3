const express = require('express');
const reload = require('reload');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');


app.set('port', process.env.PORT || 3003 );

app.set('view engine', 'ejs');
app.set('views', './Views');
app.use(bodyParser.json());

// Public
app.use(express.static('./Public'));
app.use(express.static('./Front-end'));

// Routes and api
app.use(require('./Back-end/routes/index'));
app.use(require('./Back-end/routes/api'));

var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
  
});

reload (server, app);
