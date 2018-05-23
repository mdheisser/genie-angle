var Keywords = {
  getKeywords: (event, context, callback) => {
    const data = {};
    const response = {
      statusCode: 200,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify(data),
    };
    callback(null, response);
  },
  postKeywords: (event, context, callback) => {
    const data = {};
    const response = {
      statusCode: 200,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify(data),
    };
    callback(null, response);
  },
  putKeywords: (event, context, callback) => {
    const data = {};
    const response = {
      statusCode: 200,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify(data),
    };
    callback(null, response);
  },
  deleteKeywords: (event, context, callback) => {
    const data = {};
    const response = {
      statusCode: 200,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify(data),
    };
    callback(null, response);
  },
};

module.exports = Keywords;