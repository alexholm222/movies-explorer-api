const { REGEX, VALID_URL_MESSAGE } = require('./constants');

module.exports.linkValidator = (url, validBody) => {
  if (REGEX.test(url)) {
    return url;
  }
  return validBody.message(VALID_URL_MESSAGE);
};
