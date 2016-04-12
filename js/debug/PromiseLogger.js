module.exports = {
  added: function(newPromise, currentPromises) {
    console.log('added promise: ' + newPromise);
    console.log(currentPromises);
  },
  skipped: function(promise, currentPromises) {
    console.log('skipped promise: ' + promise);
    console.log(currentPromises);
  }
};
