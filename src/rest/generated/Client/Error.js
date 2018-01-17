goog.provide('API.Client.error');

/**
 * @record
 */
API.Client.Error = function() {}

/**
 * @type {!number}
 * @export
 */
API.Client.Error.prototype.code;

/**
 * @type {!string}
 * @export
 */
API.Client.Error.prototype.message;

/**
 * @type {!Array<!string>}
 * @export
 */
API.Client.Error.prototype.fields;

