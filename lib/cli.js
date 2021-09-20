#!/usr/bin/env node
/**
 * $File: cli.js $
 * $Date: 2021-09-21 01:03:30 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2021 by Shen, Jen-Chieh $
 */

"use strict";

const fs = require('fs');
const activate = require('./parse');

const usage =
      "usage : unity-verify-code [--port] [--tls]\n" +
      "                          EMAIL [EMAIL ...] PASSWORD [PASSWORD ...] HOST [HOST ...]" +
      "\n" +
      "Unity License Activate : An email parser to get 6 digit verification code.\n" +
      "\n" +
      "positional arguments:\n" +
      "  EMAIL          Username or Email you use to register for Unity account\n" +
      "  PASSWORD       Password to login Unity account\n" +
      "  HOST           Hostname or IP address of the IMAP server. Default: 'localhost'\n" +
      "\n" +
      "optional arguments:" +
      "  port           Port number of the IMAP server. Default: 143\n" +
      "  tls            boolean - Perform implicit TLS connection? Default: false\n";

/* CLI */
const cli_md = function () {
  let args = process.argv;
  let email = args[0];
  let password = args[1];
  let host = args[2];
  let port = getArg("--port", 993);
  let tls = getArg("--tls", true);

  if (checkNull(email, password, host)) {
    console.log("[ERROR] Missing positional arguments");
    console.log(usage);
    return;
  }

  activate.start(email, password, host, port, tls);
};

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

/** CLI entry */
if (require.main === module) {
  cli_md();
}
