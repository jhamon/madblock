function format(number) {
  if (number === 0) {
    return ""
  } else if(number < 9999) {
    return `${number}`;
  } else {
    return `${Math.round(number/100) / 10}K`;
  }
}

const BadgeInfo = {
  update: function(number) {
    chrome.runtime.sendMessage({ redactCount: format(number)})
  }
};

export default BadgeInfo;