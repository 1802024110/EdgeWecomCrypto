# Languages

[中文](./README.md)|[English](./README.en.md)

# Introduction

EdgeWeComCrypto is a library specifically rewritten for enterprise WeChat in the field of edge computing, mainly
implementing message encryption, decryption, and domain verification. Using Web standard APIs, it seamlessly runs on
platforms such as CloudFlare Workers, Vercel, Deno, BUN, etc., ensuring the secure transmission and validation of WeChat
messages.

# Usage

## NPM

1. Install via npm

```npm
npm i edgewecomcrypto
```

2. Example

```js
import {decrypt} from "edgewecomcrypto";

const encryptMsg = "CH0HBGa+pgJEdeHMFNghyqbf1TJSg+W7vVx/6HThtdfrK3CLYGhEcUC/2Ayfecgck+/MxeRNOb0ZgtBzIBZso4+2LZU11zLQyDx++txixg7tYDrnE/aicQo65AdR6vMcBFb47xUK8vjC8EbQElQhzlVcb9QOlTLYIw6eAksyAJ85WL2XPha0Q5MgiowUSD98movbhdwGc3SV580qhQWtNZsVAp2ghi2EcNPxk36a8itTtlZsPHXcdy1mR4HhYlSrZVhlnz4mkfzVu9zo0wVu1zQ9JT2iKMaeDSya6C7ffZWwY1CXBeWnTpf4urs7GvFyMM6n8vVHCTHRFXGpHfvxccWvz0YgR75xjTpUzk6nOID1s761/efsymuPNLkZ5XCw453pErAloXiMMJ3SED+UMA=="
const encodingAESKey = "FMox2C8OsO0yfD8jzz6fRElAb6r6hm9BRJfUqxjnCUe"
const {message} = decrypt(encodingAESKey, encryptMsg);
console.log(message);
```

## CDN

1. Import

```html
<script src="https://cdn.jsdelivr.net/gh/1802024110/EdgeWecomCrypto/dist/index.min.js"></script>
```

2. Example

```js
const encryptMsg = "CH0HBGa+pgJEdeHMFNghyqbf1TJSg+W7vVx/6HThtdfrK3CLYGhEcUC/2Ayfecgck+/MxeRNOb0ZgtBzIBZso4+2LZU11zLQyDx++txixg7tYDrnE/aicQo65AdR6vMcBFb47xUK8vjC8EbQElQhzlVcb9QOlTLYIw6eAksyAJ85WL2XPha0Q5MgiowUSD98movbhdwGc3SV580qhQWtNZsVAp2ghi2EcNPxk36a8itTtlZsPHXcdy1mR4HhYlSrZVhlnz4mkfzVu9zo0wVu1zQ9JT2iKMaeDSya6C7ffZWwY1CXBeWnTpf4urs7GvFyMM6n8vVHCTHRFXGpHfvxccWvz0YgR75xjTpUzk6nOID1s761/efsymuPNLkZ5XCw453pErAloXiMMJ3SED+UMA=="
const encodingAESKey = "FMox2C8OsO0yfD8jzz6fRElAb6r6hm9BRJfUqxjnCUe"
const {message} = WecomCrypto.decrypt(encodingAESKey, encryptMsg);
console.log(message);
```

# Functions

## Get Signature (`getSignature`)

Get the signature.

* `token`: Token
* `timestamp`: Timestamp
* `nonce`: Nonce
* `echostr`: Encrypted data

Returns a `Promise` containing the signature string.

---

## Decrypt (`decrypt`)

Decrypt.

* `encodingAESKey`: EncodingAESKey
* `encryptTxt`: Ciphertext

Returns an object containing the decrypted information:

* `id`: Decrypted ID
* `message`: Decrypted message
* `random`: Decrypted random number

---

### Example

```js
import {decrypt} from "edgewecomcrypto";

const encodingAESKey = "FMox2C8OsO0yfD8jzz6fRElAb6r6hm9BRJfUqxjnCUe"
const encryptTxt = "bwhkOMneUrrkav5ZhvH24Jqz56GHpzwNxJCQRbTuoGneBOQZxRlckJYtbWX+HJBIDywmH9EvSxqjqBnVyTTB1+OVp9X+oGgYk0uA6/5AOGzTrK65kKjjoGwf6CYktHWTF2nh2qpRKw+ah/6XjxXnIpQ1wUsmjVmFety57eh97l+j9U/AG14zOsBciNTsAR5ei4yMcQZxF+FQF2qAxWKCQTBPrfhp4eccuwHR5/huRk8mH4zTy875B6B1kneR8sE75Rmwx1FRO0rFdMWBq0ti6hnSTXK35aAg0+VWEpZc2BK9zd4MiX0c89l9m4E7MCmbj3xPAYn9nos16pgxfVnv9+WbA1aM9xXEo0p8XXOktq+3kr4gULTAO7ik51TArHNk4q6mG5YsR5PkIoCztOZu8w=="
const {message} = decrypt(encodingAESKey, encryptTxt);
console.log(message);
```

## Encrypt (`encrypt`)

> This function is untested (because there is no domain available for testing), and there is probably a problem if it
> cannot run normally. If it doesn't work properly, please refer to
> the [official documentation](https://developer.work.weixin.qq.com/document/path/91144#%E5%8A%A0%E5%AF%86%E5%87%BD%E6%95%B0)
> and modify it yourself. Welcome to submit a PR with modified code.

Encrypts the given message using the AES encryption algorithm.

* `encodingAESKey`: AES key used for encryption, Base64 encoded.
* `message`: Message to be encrypted.
* `corpid`: Corporate ID.
* `random` (optional): Random number, default is 16 bytes.

Returns the encrypted message, Base64 encoded.

### Example

```js
import {encrypt} from "edgewecomcrypto";

const encodingAESKey = "FMox2C8OsO0yfD8jzz6fRElAb6r6hm9BRJfUqxjnCUe"
const message = `
<xml>
<ToUserName><![CDATA[toUser]]></ToUserName>
<FromUserName><![CDATA[fromUser]]></FromUserName>
<CreateTime>1357290913</CreateTime>
<MsgType><![CDATA[voice]]></MsgType>
<Voice>
    <MediaId><![CDATA[media_id]]></MediaId>
</Voice>
</xml>
`
const corpid = "wwb230a336235c4ea"
const encryptMsg = encrypt(encodingAESKey, message, corpid);
console.log(encryptMsg);
```

---

## Get JS-SDK Signature (`getJsApiSignature`)

Get the JS-SDK signature, which is the `MsgSignature` parameter in the passive reply message.

* `jsapi_ticket`: JS-SDK ticket
* `url`: The URL of the current webpage, including the trailing `/`, but not including the `#` and beyond. Needs to be
  configured as a **trusted domain** in the enterprise WeChat backend.
* `nonceStr` (optional): Random string, with a length of less than 32 characters.
* `timestamp` (optional): Current timestamp (in seconds).

Returns a `Promise` containing the signature string.

---

## Get Access Token (`getAccessToken`)

Get the access token of the account.

* `corpid`: Corporate ID
* `corpsecret`: Application's credential secret

Returns a `Promise` containing the access token string. Valid for 7200 seconds.

---

## Get JSAPI Ticket (`getJsapiTicket`)

Get the jsapi\_ticket of the account.

* `access_token`: Account's access token

Returns a `Promise` containing the jsapi\_ticket string. Within one hour, an enterprise can get a maximum of 400 times,
and a single application cannot exceed 100 times.

# Reference Documents

* [Enterprise WeChat Development Documentation](https://work.weixin.qq.com/api/doc/90000/90135/90231)
* [Enterprise WeChat Online Debugging Tool](https://developer.work.weixin.qq.com/resource/devtool)

# License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
