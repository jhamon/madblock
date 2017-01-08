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

const Redactor = {
  redact: function redact(element) {
    appendClass(element, REDACT_CLASS);
  },

  unredact: function unredact() {
    var previouslyRedacted = getRedacted();
    var timesToUnredacted = previouslyRedacted.length;
    for (var i = 0; i < timesToUnredacted; i++) {
      removeClass(previouslyRedacted[0], REDACT_CLASS);
    }
  }
}

export default Redactor;