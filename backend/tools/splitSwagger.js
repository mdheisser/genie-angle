var swag = require('swagger-split');
 
/*
 * @param {string} file - the swagger file to read from
 * @param {int} depth - how deep the files should be split up before stopping
 * @param {string} outputDirectory - where to create a directory and write your new split up swagger!
 */
swag.splitFile('../api/swagger/swagger.yaml', 2, './out');