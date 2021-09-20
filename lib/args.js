/**
 * $File: args.js $
 * $Date: 2021-09-21 02:18:26 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2021 by Shen, Jen-Chieh $
 */

"use strict";

function checkNull() {
  for (let index = 0; index < arguments.length; ++index) {
    if (arguments[index] === null)
      return true;
  }
  return false;
}

function getArg(name, defaultValue = null) {
  let args = process.argv;
  for (let index = 0; index < args.length; ++index) {
    if (args[index] === name && args.length > index + 1) {
      return args[index +1];
    }
  }
  return defaultValue;
}

/*
 * Module Exports
 */
module.exports.checkNull = checkNull;
module.exports.getArg = getArg;
