import CryptoJS from 'crypto-js';
/**
 * 获取签名
 * @param {any} token - 令牌
 * @param {any} timestamp - 时间戳
 * @param {any} nonce - 随机数
 * @param {any} echostr - 加密数据
 * @returns {Promise<string>} 签名
 */
declare function getSignature(token: string, timestamp: string, nonce: string, echostr: string): Promise<string>;
/**
 * 获取JS-SDK的签名，也就是被动回复消息里面的MsgSignature参数
 *
 * @param jsapi_ticket
 * @param url 当前网页的URL，包含结尾的/不包含#及其后面部分。重点：Url需要在企业微信后台配置可信域名，步骤为：企业微信后台->应用管理->网页授权及JS-SDK>设置可信域名
 * @param nonceStr 随机字符串，长度为32个字符以下(可选)
 * @param timestamp 当前时间戳（单位：秒）(可选)
 */
declare function getJsApiSignature(jsapi_ticket: string, url: string, nonceStr?: string, timestamp?: number): Promise<string>;
/**
 * 获取账户的access_token
 * @param corpid 企业ID
 * @param corpsecret 应用的凭证密钥
 * @returns {Promise<string>} 返回access_token
 * @note 有效期7200秒，开发者必须在自己的服务全局缓存access_token
 */
declare function getAccessToken(corpid: string, corpsecret: string): Promise<string>;
/**
 * 获取账户的jsapi_ticket
 * @param access_token 账户的access_token
 * @returns {Promise<string>} 返回jsapi_ticket
 * @note 一小时内，一个企业最多可获取400次，且单个应用不能超过100次
 */
declare function getJsapiTicket(access_token: string): Promise<string>;
/**
 * 解密
 *
 * @param encodingAESKey EncodingAESKey
 * @param encryptTxt     密文
 */
declare function decrypt(encodingAESKey: string, encryptTxt: string): {
    id: string;
    message: string;
    random: string;
};
/**
 * 使用AES加密算法加密给定的消息。
 *
 * @param {string} encodingAESKey - 用于加密的AES密钥，Base64编码。
 * @param {string} message - 需要加密的消息。
 * @param {string} corpid - 企业ID。
 * @param {CryptoJS.lib.WordArray} [random] - 随机数，默认为16字节。
 * @returns {string} 加密后的消息，Base64编码。
 */
declare function encrypt(encodingAESKey: string, message: string, corpid: string, random?: CryptoJS.lib.WordArray): string;
export { getSignature, getJsApiSignature, getAccessToken, getJsapiTicket, decrypt, encrypt };
