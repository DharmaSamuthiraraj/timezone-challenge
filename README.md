# timezone-challenge

Steps to run the application

- npm install

- npm install mocha -g

- npm start


Defined API routes

- /api/users?name=<profile name>
- /api/users/:name 

Google API
	- Used google map geocode and timezone api to get the timezone for given location.

Project folder strucure

# This folder structure based on features. (like modules).

- app
	-> lib/
		-> google-api.js
		-> logger.js
	-> users/
		-> index.js
		-> users.js 
		-> users.profile.model.js
		-> users.spec.js
- config
	-> default.json

# Logging info and erro
- log
	-> filelog-info.log
	-> filelog-error.log

# Chai unit test case
- test

