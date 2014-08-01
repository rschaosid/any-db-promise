var transaction = require('any-db-transaction');
var Promise = require('promise');

module.exports = function begin() {
  return Promise.denodeify(transaction).apply(undefined, arguments)
  .then(function(tx) {
    return {
      query: Promise.nodeify(Promise.denodeify(tx.query.bind(tx))),
      commit: Promise.nodeify(Promise.denodeify(tx.commit.bind(tx))),
      rollback: Promise.nodeify(Promise.denodeify(tx.rollback.bind(tx)))
    };
  });
};
