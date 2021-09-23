[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![dependencies Status](https://status.david-dm.org/gh/jcs090218/unity-verify-code.svg)](https://david-dm.org/jcs090218/unity-verify-code)

# unity-verify-code

An email parser to get 6 digit verification code.

This tool is design to use with [unity-license-activate](https://github.com/jcs090218/unity-license-activate)
so you can feed verification code to get pass Unity's TFA.

![TFA](./etc/tfa.png)

## 💾 Prerequisite

This application uses IMAP to parse your verfication email from Unity, so make
sure your email's IMAP service is enabled!

## 🔨 How to use?

You can use this tools with any CI/CD system as long as you have the [Node](https://nodejs.org/en/)
environment set up! Here is an example for GitHub Actions.

```yml
jobs:
  acquire_ulf:
    name: Acquire .ulf file 🔑
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14.x]
    steps:
      - name: Set up Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install node package, `unity-license-activate`
        run: npm install --global unity-license-activate

      # You would only have to install it!
      - name: Install node package, `unity-verify-code`
        run: npm install --global unity-verify-code

      - name: Activate the license
        run: unity-license-activate "${{ secrets.UNITY_EMAIL }}" "${{ secrets.UNITY_PASSWORD }}" "${{ needs.request_alf.outputs.alf }}"
```

See the full example [here](https://github.com/jcs090218/JCSUnity/blob/master/.github/workflows/build.yml).

## 📇 Command Line Arguments

```
usage : unity-verify-code [--port] [--tls]
                          EMAIL [EMAIL ...] PASSWORD [PASSWORD ...] HOST [HOST ...]
                          SAVE_PATH [SAVE_PATH ...]

Unity License Activate : An email parser to get 6 digit verification code.

positional arguments:
  EMAIL          Username or Email you use to register for Unity account
  PASSWORD       Password to login Unity account
  SAVE_PATH      File path to save the 6 digit code.

optional arguments:
  --port         Port number of the IMAP server. Default: 143
  --tls          boolean - Perform implicit TLS connection? Default: false
```

## 🔗 References

* [How Can i receive incoming mails(gmail) to my application server using imap (nodejs)](https://stackoverflow.com/questions/62404008/how-can-i-receive-incoming-mailsgmail-to-my-application-server-using-imap-nod)
