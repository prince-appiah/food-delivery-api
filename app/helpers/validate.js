const _ = require("lodash");

module.exports = {
  isString(param) {
    return _.isString(param);
  },
  isNull(value) {
    return _.isNull(value);
  },
  isBoolean(value) {
    return _.isBoolean(value);
  },
  isEmpty(value) {
    return _.isEmpty(value);
  },
  isNumber(value) {
    return _.isNumber(value) && _.isFinite(value) ? true : false;
  },
  isArray(param) {
    return _.isArray(param);
  },
  email(email) {
    if (this.isString(email)) {
      //html provides that functionality for us
      return email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
        ? true
        : false;
    } else {
      return false;
    }
  },
  passwordStrongEnough(password) {
    if (this.isString(password)) {
      //at least a number,uppercase,lowercase & 8min characters are needed(whatever the rest are)
      return !!password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d){8,}/);
    } else {
      return false;
    }
  },
};
