# EdgeWecomCrypto
EdgeWecomCrypto is a library designed specifically for enterprise WeChat in edge computing, focusing on message encryption, decryption, and domain validation. Leveraging Web standard APIs, it seamlessly operates on platforms like Cloudflare Workers, Deno, Bun, ensuring secure transmission and validation of WeChat messages.

# 浏览器使用

## NPM

## CDN

1. 导入

```html

<script src="./index.min.js"></script>
```

2. 示例

```js
const encryptMsg = "CH0HBGa+pgJEdeHMFNghyqbf1TJSg+W7vVx/6HThtdfrK3CLYGhEcUC/2Ayfecgck+/MxeRNOb0ZgtBzIBZso4+2LZU11zLQyDx++txixg7tYDrnE/aicQo65AdR6vMcBFb47xUK8vjC8EbQElQhzlVcb9QOlTLYIw6eAksyAJ85WL2XPha0Q5MgiowUSD98movbhdwGc3SV580qhQWtNZsVAp2ghi2EcNPxk36a8itTtlZsPHXcdy1mR4HhYlSrZVhlnz4mkfzVu9zo0wVu1zQ9JT2iKMaeDSya6C7ffZWwY1CXBeWnTpf4urs7GvFyMM6n8vVHCTHRFXGpHfvxccWvz0YgR75xjTpUzk6nOID1s761/efsymuPNLkZ5XCw453pErAloXiMMJ3SED+UMA=="
const encodingAESKey = "FMox2C8OsO0yfD8jzz6fRElAb6r6hm9BRJfUqxjnCUe"
const {message} = WecomCrypto.decrypt(encodingAESKey, encryptMsg);
console.log(message);
```