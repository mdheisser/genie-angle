const swag = require('swagger-split'),
    fs = require('fs-extra'),
    path = require('path'),
    YAML = require('yamljs'),
    SWAGGER_JSON = '../../api/auto_gen/swagger.json',
    SWAGGER_JSON_YAML = '../../api/auto_gen/swagger.yaml',
    SWAGGER_DIR = '../../api/swagger',
    SWAGGER_LOC = '../../api/swagger/swagger.yaml';

module.exports = function () {
    let swagger = require(module.exports.SWAGGER_JSON());
    let yaml = YAML.stringify(swagger, 4)
    fs.writeFileSync(module.exports.SWAGGER_JSON_YAML(), yaml);

    let dir = module.exports.SWAGGER_DIR();
    fs.removeSync(dir);
    swag.splitFile(module.exports.SWAGGER_JSON_YAML(), 1, dir);
    fs.rename(path.join(dir, 'index.yaml'), module.exports.SWAGGER_LOC());

}
module.exports.SWAGGER_DIR = () => path.join(__dirname, SWAGGER_DIR);
module.exports.SWAGGER_LOC = () => path.join(__dirname, SWAGGER_LOC);
module.exports.SWAGGER_JSON = () => path.join(__dirname, SWAGGER_JSON);
module.exports.SWAGGER_JSON_YAML = () => path.join(__dirname, SWAGGER_JSON_YAML);