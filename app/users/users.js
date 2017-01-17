'use strict';

const config = require('config'),
	  linkedinScraper = require('linkedin-scraper2'),
	  BasicProfile = require('./users.profile.model'),
	  googleApi = require('../lib/google-api'),
	  logger = require('../lib/logger');

/*
* Get user profile from LinkedIn
* @param 'name' type string
* @return Object
*/
const getUserProfile = (req, res) => {

	let profileName = '';

	if(Object.keys(req.params).length && req.params.name !== '') {
		profileName = req.params.name;
	}

	if(Object.keys(req.query).length && req.query.name !== '') {
		profileName = req.query.name;
	}

	if(profileName === '') {
		res.status(200).json(config.get('errorMessage.users.invalidRequest'));
	}

	const publicProfileUrl = config.get('linkedin.publicProfileBaseUrl') + profileName;
	
	/*
	* LinkedIn Scrapet using public profile url
	*/
	linkedinScraper(publicProfileUrl)
		.then(profileData => {	
			if(profileData.name === '' && profileData.location == '') {
				res.status(200).json({
					'status' : 'ZERO_RESULTS',
					'message' : 'No results found'					
				});				
			}

			logger.info(profileData);						
			/*
			* Get timezone using google maps api
			*/
			googleApi.getTimezone(profileData.location)
					.then(tzData => {						
						if(tzData.status === 'ZERO_RESULTS') {							
							profileData.timeZone = {
								'timeZoneId' : '',
								'timeZoneName' : ''
							}
						} else {
							profileData.timeZone = tzData;	
						}						
						const basicProfile = new BasicProfile(profileData);								
						res.status(200).json(basicProfile);						
					})
					.catch(err => {
						logger.error(err);
						res.status(200).json(err);						
					});				
		})
		.catch(err => {			
			logger.error(err);
			res.status(200).json(err);			
		});

	
}
/*
* All users route 
*/
const initUsers = (app) => {
	app.get('/api/users', getUserProfile);
	app.get('/api/users/:name', getUserProfile);
}


module.exports = initUsers;