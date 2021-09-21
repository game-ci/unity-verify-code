[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![dependencies Status](https://status.david-dm.org/gh/jcs090218/unity-verify-code.svg)](https://david-dm.org/jcs090218/unity-verify-code)

# unity-verify-code

An email parser to get 6 digit verification code.

## 🔨 Usage

```
usage : unity-verify-code [--port] [--tls]
                          EMAIL [EMAIL ...] PASSWORD [PASSWORD ...] HOST [HOST ...]
                          SAVE_PATH [SAVE_PATH ...]

Unity License Activate : An email parser to get 6 digit verification code.

positional arguments:
  EMAIL          Username or Email you use to register for Unity account
  PASSWORD       Password to login Unity account
  HOST           Hostname or IP address of the IMAP server. Default: 'localhost'
  SAVE_PATH      File path to save the 6 digit code.

optional arguments:  port           Port number of the IMAP server. Default: 143
  tls            boolean - Perform implicit TLS connection? Default: false
```

## 🔗 References

* [How Can i receive incoming mails(gmail) to my application server using imap (nodejs)](https://stackoverflow.com/questions/62404008/how-can-i-receive-incoming-mailsgmail-to-my-application-server-using-imap-nod)
