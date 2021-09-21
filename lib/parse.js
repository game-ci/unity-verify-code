#!/usr/bin/env node
/**
 * $File: parse.js $
 * $Date: 2021-09-21 01:04:21 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2021 by Shen, Jen-Chieh $
 */

"use strict";

const fs = require('fs');
const Imap = require('imap'), inspect = require('util').inspect;

function getHost(email) {
  if (email.includes('@gmail.com')) return 'imap.gmail.com';
  if (email.includes('@hotmail.com')) return 'imap-mail.outlook.com';
  if (email.includes('@outlook.com')) return 'imap-mail.outlook.com';
  if (email.includes('@yahoo.com')) return 'imap.mail.yahoo.com';
  return null;
}

function parse(email, password, port, tls, savePath) {
  const imap = new Imap({
    user: email,
    password: password,
    host: getHost(email),
    port: port,
    tls: tls,
    tlsOptions: {
      rejectUnauthorized: false
    },
    authTimeout: 3000,
  });

  imap.once('error', function (err) { console.log('Source Server Error:- ', err); });

  imap.once('ready', function () {
    imap.openBox('INBOX', false, function (err, box) {
      if (err) throw err;
      imap.search(['UNSEEN', ['FROM', 'accounts@unity3d.com']], function (err, results) {
        if (err) throw err;

        let f = imap.fetch(results, { bodies: '', markSeen: true, });
        f.on('message', function(msg, seqno) {
          let prefix = '(#' + seqno + ') ';
          msg.on('body', function(stream, info) {
            stream.on('data', function (chunk) {
              let content = chunk.toString('utf8');
              let startStr= "verification code is ";
              let start = content.indexOf(startStr);
              let endStr = " and will be expired in";
              let end = content.indexOf(endStr);

              if (start === -1 || end === -1)
                return;

              let part = content.substring(start + startStr.length, end);
              fs.writeFileSync(savePath, part, { encoding: 'utf8' });
            });

            return imap.end();
          });
        });
      });
    });
  });

  imap.connect();
}

/*
 * Module Exports
 */
module.exports.parse = parse;
