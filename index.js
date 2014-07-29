var anyDB = require('any-db');
var Promise = require('promise');

exports.createConnection = function() {
  return Promise.denodeify(anyDB.createConnection).apply(undefined, arguments)
  .then(function(conn) {
    conn.queryStream = conn.query;
    conn.query = Promise.nodeify(Promise.denodeify(conn.query));
    conn.end = Promise.nodeify(Promise.denodeify(conn.end));
    return conn;
  });
}

exports.createPool = function() {
  var pool = anyDB.createPool.apply(undefined, arguments);
  
  pool.queryStream = pool.query;
  pool.query = Promise.nodeify(Promise.denodeify(pool.query));
  pool.close = Promise.nodeify(Promise.denodeify(pool.close));
  
  return pool;
};
