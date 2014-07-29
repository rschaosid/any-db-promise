var transaction = require('any-db-transaction');
var Promise = require('promise');

module.exports = function begin() {
  return Promise.denodeify(transaction).apply(undefined, arguments)
  .then(function(tx) {
    tx.queryStream = tx.query;
    tx.query = Promise.nodeify(Promise.denodeify(tx.query));
    tx.commit = Promise.nodeify(Promise.denodeify(tx.commit));
    tx.rollback = Promise.nodeify(Promise.denodeify(tx.rollback));
    return conn;
  });
};
