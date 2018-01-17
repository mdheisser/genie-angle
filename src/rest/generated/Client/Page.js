goog.provide('API.Client.page');

/**
 * @record
 */
API.Client.Page = function() {}

/**
 * @type {!string}
 * @export
 */
API.Client.Page.prototype.siteId;

/**
 * @type {!string}
 * @export
 */
API.Client.Page.prototype.pageId;

/**
 * @type {!string}
 * @export
 */
API.Client.Page.prototype.name;

/**
 * @type {!boolean}
 * @export
 */
API.Client.Page.prototype.isDeleted;

/**
 * @type {!boolean}
 * @export
 */
API.Client.Page.prototype.isPromoted;

/**
 * @type {!boolean}
 * @export
 */
API.Client.Page.prototype.isAutoKeywords;

/**
 * @type {!string}
 * @export
 */
API.Client.Page.prototype.collectionName;

/**
 * @type {!Array<!API.Client.url>}
 * @export
 */
API.Client.Page.prototype.urls;

