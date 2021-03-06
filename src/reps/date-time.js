// ReactJS
const React = require("react");

// Reps
const {
  isGrip,
  safeObjectLink,
  wrapRender,
} = require("./rep-utils");

// Shortcuts
const { span } = React.DOM;

/**
 * Used to render JS built-in Date() object.
 */
DateTime.propTypes = {
  object: React.PropTypes.object.isRequired,
  objectLink: React.PropTypes.func,
};

function DateTime(props) {
  let grip = props.object;
  let date;
  try {
    date = span({className: "objectBox"},
      getTitle(props, grip),
      span({className: "Date"},
        new Date(grip.preview.timestamp).toISOString()
      )
    );
  } catch (e) {
    date = span({className: "objectBox"}, "Invalid Date");
  }

  return date;
}

function getTitle(props, grip) {
  return safeObjectLink(props, {}, grip.class + " ");
}

// Registration
function supportsObject(grip, type) {
  if (!isGrip(grip)) {
    return false;
  }

  return (type == "Date" && grip.preview);
}

// Exports from this module
module.exports = {
  rep: wrapRender(DateTime),
  supportsObject,
};
