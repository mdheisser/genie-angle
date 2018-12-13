const MODULES_LOC = './../',
    fs = require('fs-extra'),
    m2s = require('mongoose-to-swagger'),
    splitSwagger = require('./splitSwagger'),
    path = require('path'),
    junk = require('junk');

module.exports = function () {
    let modules = path.join(__dirname, MODULES_LOC)
    swagger = splitSwagger.SWAGGER_JSON();
    let existing = require(swagger);
    fs.readdirSync(modules)
        .filter(file =>
            !junk.is(file) &&
            !file.startsWith('.'))
        .forEach(file => {
            let fileLoc = path.join(modules, file);
            const model = require(fileLoc);
            const swaggerSchema = m2s(model);
            existing.definitions[model.modelName].properties = swaggerSchema.properties;
            if (swaggerSchema.required.length)
                existing.definitions[model.modelName].required = swaggerSchema.required;
        });
    fs.writeFileSync(swagger, JSON.stringify(existing, null, 2));
}