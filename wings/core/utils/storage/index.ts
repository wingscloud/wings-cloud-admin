import type { AppStorageOptions } from './index.d';
import { isNullOrUndefined } from '../common';

/**
 * @name storageType
 * @description 返回缓存的类型
 * @param type
 * @return storage
 */
export const storageType = (type: string): Storage => {
  return type === 'local' ? localStorage : sessionStorage;
};

/**
 * @name setStorage
 * @description 基于 storage 的写入缓存方法
 * @param key
 * @param data
 * @param options
 */
export const setStorage = (
  key: string,
  data: any,
  options?: AppStorageOptions
): void => {
  key = `${import.meta.env.APP_STOREAGE_PREFIX as unknown as string}-${key}`;
  options = {
    type: import.meta.env.APP_STOREAGE_TYPE,
    isTemplate: false,
    isJSON: true,
    ...options,
  };
  storageType(options.type as unknown as string).setItem(
    key,
    options.isTemplate
      ? JSON.stringify({
          user: options.user,
          time: new Date().getTime(),
          data,
          desc: options.desc,
        })
      : options.isJSON
      ? JSON.stringify(data)
      : data
  );
};

/**
 * @name getStorage
 * @description 基于 storage 的读取缓存方法
 * @param key
 * @param options
 * @return data
 */
export const getStorage = (key: string, options?: AppStorageOptions): any => {
  key = `${import.meta.env.APP_STOREAGE_PREFIX as unknown as string}-${key}`;
  options = {
    type: import.meta.env.APP_STOREAGE_TYPE,
    isTemplate: false,
    isJSON: true,
    ...options,
  };
  const data: any | null = storageType(
    options.type as unknown as string
  ).getItem(key);
  if (options.isDelete) {
    storageType(options.type as unknown as string).removeItem(key);
  }
  return isNullOrUndefined(data)
    ? options.defaultData
      ? options.defaultData
      : null
    : options.isTemplate
    ? data
      ? JSON.parse(data)
      : options.defaultData
    : options.isJSON
    ? JSON.parse(data)
    : data;
};

/**
 * @name removeStorage
 * @description 基于 storage 的移除缓存方法
 * @param key
 * @param type
 */
export const removeStorage = (key: string, type?: string): void => {
  key = `${import.meta.env.APP_STOREAGE_PREFIX as unknown as string}-${key}`;
  storageType(type || import.meta.env.APP_STOREAGE_TYPE).removeItem(key);
};