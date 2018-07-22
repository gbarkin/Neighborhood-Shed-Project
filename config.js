'use strict';
// exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/jwt-auth-demo';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://gbarkin:password12345@ds147011.mlab.com:47011/neighborhood-shed-db';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/jwt-auth-demo';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';