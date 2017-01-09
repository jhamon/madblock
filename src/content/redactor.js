const REDACT_CLASS = 'redacted';

function appendClass(element, className) {
  let oldClasses = element.getAttribute("class");
  if (oldClasses && oldClasses.indexOf(className) === -1) {
    let newClasses = oldClasses.length > 0 ? `${oldClasses} ${className}` : className;
    element.setAttribute("class", newClasses);
  }
  if (oldClasses === null) {
    element.setAttribute("class", className);
  }
}

function removeClass(element, className) {
  element.setAttribute("class", element.getAttribute("class").replace(className, "").trim());
}

function getRedacted() {
  return document.getElementsByClassName(REDACT_CLASS);
}

function label(base) {
  return `${base}-redacted`;
}

const Redactor = {
  redact: function redact(labelBase) {
    var siteLabel = label(labelBase);
    return function (element) {
      appendClass(element, `${siteLabel} ${REDACT_CLASS}`);
    };
  },

  unredact: function unredact(labelBase) {
    var previouslyRedacted = getRedacted();
    var timesToUnredacted  = previouslyRedacted.length;
    var siteLabel = label(labelBase);
    for (var i = 0; i < timesToUnredacted; i++) {
      removeClass(previouslyRedacted[0], `${siteLabel} ${REDACT_CLASS}`);
    }
  }
}

export default Redactor;