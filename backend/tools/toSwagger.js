const modulesFolder = '../models/';
const fs = require('fs');
const m2s = require('mongoose-to-swagger');

var finalObject = [];

fs.readdirSync(modulesFolder).forEach(file => {
    const model = require(modulesFolder + file);
    const swaggerSchema = m2s(model);

    var result = {};
    result[model.modelName] = swaggerSchema;
    finalObject.push(result);
});

console.log(JSON.stringify(finalObject));