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
const { simpleParser } = require('mailparser');

function openInbox(imap, cb) {
  imap.openBox('INBOX', true, cb);
}

function parse(email, password, host, port, tls) {
  const imap = new Imap({
    user: email,
    password: password,
    host: host,
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

        let f = imap.fetch(results, { bodies: '', markSeen: false, });
        f.on('message', function(msg, seqno) {
          console.log('Message #%d', seqno);
          let prefix = '(#' + seqno + ') ';
          msg.on('body', function(stream, info) {
            console.log(prefix + 'Body');
            stream.pipe(fs.createWriteStream('./data/msg-' + seqno + '-body.txt'));

            stream.on('data', function (chunk) {
              let content = chunk.toString('utf8');;
              console.log(chunk);
              //console.log(content);
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
