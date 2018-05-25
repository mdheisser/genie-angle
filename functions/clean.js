const del = require('del');
 
del(['./serverless/gen/*.*']).then(paths => {
    console.log('Deleted:\n', paths.join('\n'));
});