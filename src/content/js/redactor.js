import Logger from './logger.js'

const REDACT_CLASS = 'redacted';
const SEEN_CLASS = 'madblock-seen';

function appendClass(element, className) {
  let oldClasses = element.getAttribute("class");
  if (oldClasses && oldClasses.indexOf(className) === -1) {
    let newClasses = oldClasses.length > 0 ? `${oldClasses} ${className}` : className;
    element.setAttribute("class", newClasses);
  } else {
    element.setAttribute("class", className);
  }
}

function removeClass(element, className) {
  element.setAttribute("class", element.getAttribute("class").replace(className, "").trim());
}

function getRedacted() {
  return document.getElementsByClassName(SEEN_CLASS);
}

function label(base) {
  return `${base}-redacted`;
}

function mark(el) {
  appendClass(el, SEEN_CLASS);
}

function redact(labelBase) {
  var siteLabel = label(labelBase);
  return function (element) {
    appendClass(element, `${siteLabel} ${REDACT_CLASS} ${SEEN_CLASS}`);
  };
}

const Redactor = {
  getElements: function(selector) {
    return document.querySelectorAll(`${selector}:not(.${SEEN_CLASS})`);
  },

  markAll: function(elementList) {
    elementList.map(function(el) { mark(el) });
  },

  redactAll: function(elementList, labelBase) {
    elementList.map((el) => { redact(labelBase)(el) });
  },

  redact: redact,

  unredact: function unredact(labelBase) {
    var previouslyRedacted = getRedacted();
    var timesToUnredacted  = previouslyRedacted.length;

    var siteLabel = label(labelBase);
    for (var i = 0; i < timesToUnredacted; i++) {
      var previouslyRedactedElement = previouslyRedacted[0];
      removeClass(previouslyRedactedElement, `${siteLabel}`);
      removeClass(previouslyRedactedElement, `${SEEN_CLASS}`);
      removeClass(previouslyRedactedElement, `${REDACT_CLASS}`);
    }
  }
}

export default Redactor;