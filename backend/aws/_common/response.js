module.exports = {
    ok: done,
    fail: error
}

function done(body,callback,status) {

    let result = {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        statusCode: status | 200,
        body: JSON.stringify(body)
    }
    callback(null, result);
}

function error(body,callback,status) {
    let result = {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        statusCode: status | 500,
        body: JSON.stringify(body)
    }
    callback(result);
}