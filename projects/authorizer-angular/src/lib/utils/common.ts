import { hasWindow } from './window';

export const getIntervalDiff = (accessTokenExpiresAt: number) => {
  const expiresAt = accessTokenExpiresAt * 1000 - 300000;
  const currentDate = new Date();

  const millisecond = new Date(expiresAt).getTime() - currentDate.getTime();
  return millisecond;
};

export const getCrypto = () => {
  //ie 11.x uses msCrypto
  // @ts-ignore-next-line
  return hasWindow() ? window.crypto || window.msCrypto : null;
};

export const createRandomString = () => {
  const charset =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_~.';
  let random = '';
  const crypto = getCrypto();
  if (crypto) {
    const randomValues = Array.from(crypto.getRandomValues(new Uint8Array(43)));
    randomValues.forEach((v) => (random += charset[v % charset.length]));
  }
  return random;
};

export const createQueryParams = (params: any) => {
  return Object.keys(params)
    .filter((k) => typeof params[k] !== 'undefined')
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
};

export const isValidEmail = (email: any) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const capitalizeFirstLetter = (data: string) => {
  if (!data) return '';
  return data ? data.charAt(0).toUpperCase() + data.slice(1) : null;
};

export const isValidOtp = (otp: string) => {
  const re = /^([A-Z0-9]{6})$/;
  return otp && re.test(String(otp.trim()));
};

export const formatErrorMessage = (message: string) => {
  return message.replace(`[GraphQL] `, '');
};

export const hasSpecialChar = (char: string): boolean => {
  const re = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  return re.test(char);
};

export const validatePassword = (
  value: string
): {
  score: number;
  strength: string;
  hasSixChar: boolean;
  hasLowerCase: boolean;
  hasUpperCase: boolean;
  hasNumericChar: boolean;
  hasSpecialChar: boolean;
  maxThirtySixChar: boolean;
  isValid: boolean;
} => {
  const res = {
    score: 0,
    strength: '',
    hasSixChar: false,
    hasLowerCase: false,
    hasUpperCase: false,
    hasNumericChar: false,
    hasSpecialChar: false,
    maxThirtySixChar: false,
  };

  if (value.length >= 6) {
    res.score = res.score + 1;
    res.hasSixChar = true;
  }

  if (value.length > 0 && value.length <= 36) {
    res.score = res.score + 1;
    res.maxThirtySixChar = true;
  }

  Array.from(value).forEach((char: any) => {
    if (char >= 'A' && char <= 'Z' && !res.hasUpperCase) {
      res.score = res.score + 1;
      res.hasUpperCase = true;
    } else if (char >= 'a' && char <= 'z' && !res.hasLowerCase) {
      res.score = res.score + 1;
      res.hasLowerCase = true;
    } else if (char >= '0' && char <= '9' && !res.hasNumericChar) {
      res.score = res.score + 1;
      res.hasNumericChar = true;
    } else if (hasSpecialChar(char) && !res.hasSpecialChar) {
      res.score = res.score + 1;
      res.hasSpecialChar = true;
    }
  });

  if (res.score <= 2) {
    res.strength = 'Weak';
  } else if (res.score <= 4) {
    res.strength = 'Good';
  } else if (res.score <= 5) {
    res.strength = 'Strong';
  } else {
    res.strength = 'Very Strong';
  }

  const isValid = Object.values(res).every((i) => Boolean(i));
  return { ...res, isValid };
};
