import _ from 'underscore';

function format(number) {
  if (number === 0) {
    return ""
  } else if(number < 1000) {
    return `${number}`;
  } else {
    return `${Math.round(number/100) / 10}K`;
  }
}

function update(number) {
  chrome.runtime.sendMessage({ type: 'badge', redactCount: format(number)})
}

function dedupe(func) {
  return function() {
    var shouldCall = (!func.lastArgs || func.lastArgs[0] !== arguments[0]);
    func.lastArgs = arguments;
    if (shouldCall) func.apply(this, arguments);
  }
}

const BadgeInfo = {
  // Only tell chrome to repaint badge if value has changed
  update: _.throttle(dedupe(update), 200)
};

export default BadgeInfo;