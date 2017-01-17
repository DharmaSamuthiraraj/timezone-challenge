# Timezone Challenge

#Steps to run the application

- npm install

- npm install mocha -g

- npm start


#API routes

- /api/users?name=dharma-samuthiraraj
- /api/users/:name 

#Google API
	- Used google maps geocode and timezone api to get the timezone for given location.

#Project folder strucure

Organized Files Around Features, Not Roles

- app
	- lib/
		- google-api.js
		- logger.js
	- users/
		- index.js
		- users.js 
		- users.profile.model.js
		- users.spec.js
- config
	- default.json

#Logging info and error
- log
	- filelog-info.log
	- filelog-error.log

#Chai unit test case
	- test

