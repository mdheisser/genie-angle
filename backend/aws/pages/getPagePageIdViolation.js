
module.exports.main = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      name: 'getPagePageIdViolation'
    }),
  };
  callback(null, response);
};