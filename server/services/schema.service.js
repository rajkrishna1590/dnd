var config = require('config.json');
var _ = require('lodash');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('schema');

var service = {};
 
service.create = create; 

module.exports = service;
 
function create(userParam) {
    var deferred = Q.defer(); 
	
    function createSchema() {
        db.schema.insert(
            userParam,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }
	createSchema();

    return deferred.promise;
}
 