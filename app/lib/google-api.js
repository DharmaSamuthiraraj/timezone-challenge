'use strict';

const rp = require('request-promise'),	  
	  Q = require('q'),
	  config = require('config'),
	  logger = require('../lib/logger');

const apiKey = config.get('googleApi.apiKey'),
      googleApiBaseUrl = config.get('googleApi.baseUrl'),
      ZERO_RESULTS = {
      	'status' : 'ZERO_RESULTS'
      };

/*
* Get geolocation by address
* @param 'address' type string
* @return object
*/
const getGeoLocationByAddress = (address) => {
	const deferred = Q.defer(),
		  params = '?address=' + address + '&key=' + apiKey;

	const options = {
		uri : googleApiBaseUrl + config.get('googleApi.geocode') + params,
		method : 'GET'
	}

	rp(options)
		.then(response => {
			const data = JSON.parse(response);
			if(!data.results.length && data.status === 'ZERO_RESULTS') {				
				deferred.resolve(ZERO_RESULTS);
			}
			const results = data.results[0];
			logger.info(results);
			deferred.resolve(results.geometry.location);			
		})
		.catch(err => {
			logger.error(err);
			deferred.reject(err);
		});

	return deferred.promise;
};


/*
* Get timezone by gelocation
* @param 'gelocation' type object
* @return object
*/

const getTimeZoneByGeoCode = (geoLocation) => {
	const deferred = Q.defer(),
		  geoLocationStr = geoLocation.lat + ',' + geoLocation.lng,
		  timestamp = Math.floor(Date.now() / 1000);

	const params = '?location=' + geoLocationStr + '&timestamp=' + timestamp + '&key=' + apiKey

	const options = {
		uri : googleApiBaseUrl + config.get('googleApi.timezone') + params,
		method : 'GET'
	}

	rp(options)
		.then(response => {
			const data = JSON.parse(response);
			if(data.status !== 'OK') {
				deferred.resolve(ZERO_RESULTS);
			}
			logger.info(data);		
			deferred.resolve({
				'timeZoneId' : data.timeZoneId,
				'timeZoneName' : data.timeZoneName
			});
		})
		.catch(err => {
			logger.error(err);
			deferred.reject(err);
		});

	return deferred.promise;
};

/*
* Get timezone by address
* @param 'address' type string
* @return object
*/

const getTimezone = (address) => {

	const deferred = Q.defer();

	getGeoLocationByAddress(address)
		.then(geoLocation => {			
			if(geoLocation.status === 'ZERO_RESULTS') {
				deferred.resolve(ZERO_RESULTS);
			}
			getTimeZoneByGeoCode(geoLocation)
				.then(timezone => {
					if(timezone.status === 'ZERO_RESULTS') {
						deferred.resolve(ZERO_RESULTS);
					}
					deferred.resolve(timezone);
				})
				.catch(err => {
					deferred.reject(err);
				})
		})
		.catch(err => {
			logger.error(err);
			deferred.reject(err);
		}) 
	return deferred.promise;
};



module.exports = {
	getTimezone : getTimezone
};