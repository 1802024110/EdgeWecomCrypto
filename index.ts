import CryptoJS from 'crypto-js';

/**
 * 获取签名
 * @param {any} token - 令牌
 * @param {any} timestamp - 时间戳
 * @param {any} nonce - 随机数
 * @param {any} encrypt - 加密数据
 * @returns {Promise<string>} 签名
 */
async function getSignature(token: any, timestamp: any, nonce: any, encrypt: any): Promise<string> {
    const data = new TextEncoder().encode([token, timestamp, nonce, encrypt].sort().join(''));
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * 获取JS-SDK的签名，也就是被动回复消息里面的MsgSignature参数
 *
 * @param jsapi_ticket
 * @param url 当前网页的URL，包含结尾的/不包含#及其后面部分。重点：Url需要在企业微信后台配置可信域名，步骤为：企业微信后台->应用管理->网页授权及JS-SDK>设置可信域名
 * @param nonceStr 随机字符串，长度为32个字符以下(可选)
 * @param timestamp 当前时间戳（单位：秒）(可选)
 */
async function getJsApiSignature(jsapi_ticket: string, url: string, nonceStr?: string, timestamp?: number) {
     nonceStr = nonceStr || Math.random().toString(36).slice(2);
     timestamp = timestamp || Math.floor(Date.now() / 1000);
    const rawString = `jsapi_ticket=${jsapi_ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
    const js_api_signature = CryptoJS.SHA1(rawString).toString();
    return js_api_signature;
}

/**
 * 获取账户的access_token
 * @param corpid 企业ID
 * @param corpsecret 应用的凭证密钥
 * @returns {Promise<string>} 返回access_token
 * @note 有效期7200秒，开发者必须在自己的服务全局缓存access_token
 */
async function getAccessToken(corpid: string, corpsecret: string): Promise<string> {
    const data = await fetch(`https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${corpid}&corpsecret=${corpsecret}`)
    const data_json: any = await data.json();
    if (data_json.errcode===0) {
        return data_json.access_token;
    }else {
        throw new Error(`errcode: ${data_json.errcode};errmsg: ${data_json.errmsg}`);
    }
}

/**
 * 获取账户的jsapi_ticket
 * @param access_token 账户的access_token
 * @returns {Promise<string>} 返回jsapi_ticket
 * @note 一小时内，一个企业最多可获取400次，且单个应用不能超过100次
 */
async function getJsapiTicket(access_token: string): Promise<string> {
     const data = await fetch(`https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=${access_token}`)
     const data_json: any = await data.json();
     if (data_json.errcode===0) {
         return data_json.ticket;
     }else {
         throw new Error(`errcode: ${data_json.errcode};errmsg: ${data_json.errmsg}`);
     }
}

/**
 * 解密
 *
 * @param encodingAESKey EncodingAESKey
 * @param encryptTxt     密文
 */
function decrypt(encodingAESKey: string, encryptTxt: string) {
    const key = CryptoJS.enc.Base64.parse(encodingAESKey);
    const iv = CryptoJS.lib.WordArray.create(key.words.slice(0, 4));
    const encrypted = CryptoJS.enc.Base64.parse(encryptTxt);
    const latin1String = CryptoJS.AES.decrypt(
        { ciphertext: encrypted } as  CryptoJS.lib.CipherParams,
        key,
        { iv: iv }
    ).toString(CryptoJS.enc.Latin1);

    const decoder = new TextDecoder();
    const bytes = new Uint8Array(latin1String.split('').map((char) => char.charCodeAt(0)));
    const utf8String = decoder.decode(bytes);
    //  去掉前16随机字节和4个字节的msg_len
    const message = utf8String.substring(16);

    return {
        id: utf8String.slice(utf8String.length - 18,utf8String.length ),
        message: utf8String.slice(20, utf8String.length - 18),
        random: utf8String.slice(0, 16)
    };
}

/**
 * 使用AES加密算法加密给定的消息。
 *
 * @param {string} encodingAESKey - 用于加密的AES密钥，Base64编码。
 * @param {string} message - 需要加密的消息。
 * @param {string} corpid - 企业ID。
 * @param {CryptoJS.lib.WordArray} [random] - 随机数，默认为16字节。
 * @returns {string} 加密后的消息，Base64编码。
 */
function encrypt(encodingAESKey: string, message: string , corpid: string, random: CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.random(16)): string {
    // 解析Base64编码的AES密钥
    const key = CryptoJS.enc.Base64.parse(encodingAESKey);
    // 创建初始化向量
    const iv = CryptoJS.lib.WordArray.create(key.words.slice(0, 4));

    // 构造需要加密的字符串格式: random(16字节) + 消息长度(4字节) + 消息内容 + 消息ID
    const msgLength = new Uint8Array(new Uint32Array([message.length]).buffer);
    const rawStr = random + String.fromCharCode(...msgLength) + message + corpid;

    // 加密
    const encrypted = CryptoJS.AES.encrypt(
        rawStr,
        key,
        { iv: iv }
    ).toString();

    // 将密文转化为Base64编码
    return encrypted;
}

export { getSignature, getJsApiSignature, getAccessToken, getJsapiTicket, decrypt, encrypt };