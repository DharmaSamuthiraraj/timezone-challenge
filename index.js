/*
* Timezone challenge index.js - Dharmendran 11-01-2017
*/

'use strict';

const app = require('./app'),
	  config = require('config');	 

const port = process.env.PORT || config.get('port');

app.listen(port, (err) => {
	if (err) {
    	throw err;
  	}
  	console.log(`Server is listening on ${port}...`);
});










