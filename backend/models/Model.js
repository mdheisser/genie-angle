const swaggerMongoose = require('swagger-mongoose'),
    yaml = require('js-yaml'),
    path = require('path'),
    fs = require('fs');

let loc = path.join(__dirname, '../api/swagger/swagger.yaml');


var resolve = require('json-refs').resolveRefs;
var YAML = require('js-yaml');

var root = YAML.load(fs.readFileSync(loc).toString());
var options = {
    filter: ['relative', 'remote'],
    loaderOptions: {
        processContent: function (res, callback) {
            callback(null, YAML.safeLoad(res.text));
        }
    }
};
resolve(root, options).then(function (results) {
    console.log(JSON.stringify(results.resolved, null, 3));
    // var Pet = swaggerMongoose.compile(results.resolved).models.Page;
    // console.log(Pet);
});