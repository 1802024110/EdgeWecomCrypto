# Languages

[中文](./README.md)|[English](./README.en.md)

# 简介

EdgeWeComCrypto是专门针对企业微信在边缘计算领域重新编写的库，主要实现了消息加密、解密和域验证。利用Web标准API，它可以在CloudFlare
Workers、Vercel、Deno、BUN等平台上无缝运行，确保微信消息的安全传输和验证。

# 使用方法
## NPM

1. 使用npm安装

```npm
npm i edgewecomcrypto
```

2. 示例

```js
const encryptMsg = "CH0HBGa+pgJEdeHMFNghyqbf1TJSg+W7vVx/6HThtdfrK3CLYGhEcUC/2Ayfecgck+/MxeRNOb0ZgtBzIBZso4+2LZU11zLQyDx++txixg7tYDrnE/aicQo65AdR6vMcBFb47xUK8vjC8EbQElQhzlVcb9QOlTLYIw6eAksyAJ85WL2XPha0Q5MgiowUSD98movbhdwGc3SV580qhQWtNZsVAp2ghi2EcNPxk36a8itTtlZsPHXcdy1mR4HhYlSrZVhlnz4mkfzVu9zo0wVu1zQ9JT2iKMaeDSya6C7ffZWwY1CXBeWnTpf4urs7GvFyMM6n8vVHCTHRFXGpHfvxccWvz0YgR75xjTpUzk6nOID1s761/efsymuPNLkZ5XCw453pErAloXiMMJ3SED+UMA=="
const encodingAESKey = "FMox2C8OsO0yfD8jzz6fRElAb6r6hm9BRJfUqxjnCUe"
const {message} = WecomCrypto.decrypt(encodingAESKey, encryptMsg);
console.log(message);
```
## CDN
1. 导入
```html

<script src="https://cdn.jsdelivr.net/gh/1802024110/EdgeWecomCrypto/dist/index.min.js"></script>
```
2. 示例

```js
const encryptMsg = "CH0HBGa+pgJEdeHMFNghyqbf1TJSg+W7vVx/6HThtdfrK3CLYGhEcUC/2Ayfecgck+/MxeRNOb0ZgtBzIBZso4+2LZU11zLQyDx++txixg7tYDrnE/aicQo65AdR6vMcBFb47xUK8vjC8EbQElQhzlVcb9QOlTLYIw6eAksyAJ85WL2XPha0Q5MgiowUSD98movbhdwGc3SV580qhQWtNZsVAp2ghi2EcNPxk36a8itTtlZsPHXcdy1mR4HhYlSrZVhlnz4mkfzVu9zo0wVu1zQ9JT2iKMaeDSya6C7ffZWwY1CXBeWnTpf4urs7GvFyMM6n8vVHCTHRFXGpHfvxccWvz0YgR75xjTpUzk6nOID1s761/efsymuPNLkZ5XCw453pErAloXiMMJ3SED+UMA=="
const encodingAESKey = "FMox2C8OsO0yfD8jzz6fRElAb6r6hm9BRJfUqxjnCUe"
const {message} = WecomCrypto.decrypt(encodingAESKey, encryptMsg);
console.log(message);
```

# 函数

## 获取签名 (`getSignature`)

获取签名。

- `token`: 令牌
- `timestamp`: 时间戳
- `nonce`: 随机数
- `encrypt`: 加密数据

返回一个 `Promise`，包含签名字符串。

---

## 获取JS-SDK的签名 (`getJsApiSignature`)

获取JS-SDK的签名，也就是被动回复消息里面的 `MsgSignature` 参数。

- `jsapi_ticket`: JS-SDK票据
- `url`: 当前网页的URL，包含结尾的`/`，不包含`#`及其后面部分。需要在企业微信后台配置可信域名。
- `nonceStr` (可选): 随机字符串，长度为32个字符以下。
- `timestamp` (可选): 当前时间戳（单位：秒）。

返回一个 `Promise`，包含签名字符串。

---

## 获取账户的access_token (`getAccessToken`)

获取账户的access_token。

- `corpid`: 企业ID
- `corpsecret`: 应用的凭证密钥

返回一个 `Promise`，包含access_token字符串。有效期7200秒。

---

## 获取账户的jsapi_ticket (`getJsapiTicket`)

获取账户的jsapi_ticket。

- `access_token`: 账户的access_token

返回一个 `Promise`，包含jsapi_ticket字符串。一小时内，一个企业最多可获取400次，且单个应用不能超过100次。

---

## 解密 (`decrypt`)

解密。

- `encodingAESKey`: EncodingAESKey
- `encryptTxt`: 密文

返回一个对象，包含解密后的信息：

- `id`: 解密后的ID
- `message`: 解密后的消息
- `random`: 解密后的随机数

---

## 加密 (`encrypt`)

使用AES加密算法加密给定的消息。

- `encodingAESKey`: 用于加密的AES密钥，Base64编码。
- `message`: 需要加密的消息。
- `corpid`: 企业ID。
- `random` (可选): 随机数，默认为16字节。

返回加密后的消息，Base64编码。

# 许可证

该项目基于 MIT 许可证发布 - 请参阅 LICENSE 文件以获取更多信息。

