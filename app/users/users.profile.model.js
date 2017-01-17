'use strict';

const config = require('config');

const BasicProfile = function (profile) {
	this.name = profile.name || '';
    this.headline = profile.headline || '';
    this.location = profile.location || '';
    this.summary = profile.summary || '';
    this.currentPosition = profile.currentPosition || [];
    this.publicProfileUrl = profile.publicProfileUrl || [];
    this.timeZone = profile.timeZone
    this.status = 'OK';  

}


module.exports = BasicProfile;
