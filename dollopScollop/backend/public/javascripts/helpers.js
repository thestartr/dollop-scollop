module.exports = {
  setIntervalX: function(callback, delay, repetitions) {
    var x = 0;
    var intervalID = setInterval(function() {
      callback();

      if (++x === repetitions) {
        clearInterval(intervalID);
      }
    }, delay);
  }
};
