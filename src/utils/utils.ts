import { parse } from 'querystring';
import { decrypt, encrypt } from './crypto';
import jdenticon from 'jdenticon';
import crypto from 'crypto';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);
export const getUID = () => {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  // @ts-ignore
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';
  return s.join('');
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

type ILocalData =
  | 'currentUser'
  | 'restore'
  | 'lastLogin'
  | 'connection'
  | 'transferContract'
  | 'autoLogin';

type IEncryptedData = 'userList' | 'mnemonic' | 'privateKey';

export const generateAvatar = (key: string, size) => {
  return jdenticon.toSvg(key, size);
};

export const setItem = <T = any>(key: ILocalData, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = <T = any>(key: ILocalData): T => {
  const res = localStorage.getItem(key);
  if (res) {
    return JSON.parse(res);
  }
};

export const setEncryptedItem = (key: IEncryptedData, value: any) => {
  const encryptedData = encrypt(JSON.stringify(value));
  localStorage.setItem(key, encryptedData);
};

export const getDecryptedItem = (key: IEncryptedData) => {
  const res = localStorage.getItem(key) as string;
  if (res) {
    const des = decrypt(res);
    return des ? JSON.parse(des) : undefined;
  }
};
export const copyToClipboard = (string: string): boolean => {
  const tempInput = document.createElement('input'); //create temp input
  document.body.appendChild(tempInput); // add tempInput to DOM
  tempInput.value = string;
  tempInput.focus();
  // get selection
  if (tempInput.setSelectionRange) tempInput.setSelectionRange(0, tempInput.value.length);
  else tempInput.select();
  let flag;
  try {
    flag = document.execCommand('copy'); // Exec Copy
  } catch (e) {
    flag = false;
  }
  document.body.removeChild(tempInput); // Delete TempInput

  return flag;
};

export const Uint8ArrayToString = (fileData: Uint8Array) => {
  var dataString = '';
  for (var i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i]);
  }

  return dataString;
};

export const stringToUint8Array = (str: string) => {
  var arr = [];
  for (var i = 0, j = str.length; i < j; ++i) {
    arr.push(str.charCodeAt(i));
  }
  return new Uint8Array(arr);
};

/**
 * 判断锁定时间是否超过
 * @param lockTime number
 */
export const checkOverTime = (lockTime: number) => {
  const lastLogin = getItem('lastLogin');
  const dueTime = lockTime * 60 * 1000; // lock after 30 mins
  const duration = new Date().valueOf() - Number(lastLogin);

  return duration > dueTime;
};

/**
 * 睡眠一会
 * @param ms 毫秒
 */
export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
