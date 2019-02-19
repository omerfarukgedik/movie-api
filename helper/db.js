const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://movie-user:abcd1234@ds119070.mlab.com:19070/movie-api', {useNewUrlParser: true});
    mongoose.connection.on('open', () => { console.log('connected' ); });
    mongoose.connection.on('error', (err) => { console.log('error:', err ); });
    mongoose.Promise = global.Promise;
};