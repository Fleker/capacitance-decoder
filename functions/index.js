/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The Capacitance Decoder action for Google Assistant
 */

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const { dialogflow } = require('actions-on-google');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const ACTION_DECODE = 'decode';
const ACTION_ENCODE = 'encode';

const isEmpty = (string) => {
  return string === undefined || string === null ||
    (isNaN(string) && typeof string === "number") || string.length === 0;
}

const toleranceMap = {
  'B': 0.1,
  'C': 0.25,
  'D': 0.5,
  'F': 1,
  'G': 2,
  'J': 5,
  'K': 10,
  'M': 20,
  'Z': 50
}

// Magnitude relative to picofarads
const magnitude = {
  'pf': 1,
  'nf': 1000,
  'mf': 1000000
}

exports.privacy = functions.https.onRequest((_, response) => {
  response.send('<h1>About Capacitance Decoder</h1><p>Capacitance Decoder gives users a hands-free way to get properties about capacitors. ' +
        'Each request is sent anonymously and queries are not shared with any third-parties.</p>');
});

const app = dialogflow();

app.intent(ACTION_DECODE, (conv, {code, tolerance}) => {
  const codeStr = String(code);

  // We assume the code is 3 digits
  const code1 = parseInt(codeStr.substr(0, 1));
  const code2 = parseInt(codeStr.substr(1, 1));
  const code3 = parseInt(codeStr.substr(2, 1));
  let farads = Math.pow(10, code3 + 1) * code1; // Convert for primary digit
  farads += Math.pow(10, code3) * code2; // Secondary digit

  if (!isEmpty(tolerance)) {
    conv.close(`This is a ${farads} pF capacitor with a ${toleranceMap[tolerance]} percent tolerance`);
  } else {
    conv.close(`This is a ${farads} pF capacitor.`);
  }
});

app.intent(ACTION_ENCODE, (conv, {unit, capacitance}) => {
  let farads = capacitance * magnitude[unit];
  let code1 = String(farads).substr(0, 1);
  let code2 = String(farads).substr(1, 1);
  let code3 = Math.floor(Math.log10(farads)) - 1;
  const finalCode = `${code1}${code2}${code3}`;
  conv.close(`You should look for a capacitor with the label ${finalCode}`);
});

exports.api_v1 = functions.https.onRequest(app);
