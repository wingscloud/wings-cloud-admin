import type {
  LoginAccountData,
  SignupData,
  ValidateUsernameParams,
} from './user.d';
import type { ResponseData } from '@/utils/request/index.d';
import { GET, POST } from '@/utils/request';

/**
 * @name loginByAccount
 * @description 登录 - 通过账号密码
 */
export const loginByAccount = <T>(
  data: LoginAccountData
): Promise<any | ResponseData<T> | undefined> => {
  return POST('/system/user/login', data);
};

/**
 * @name signup
 * @description 注册
 */
export const signup = <T>(
  data: SignupData
): Promise<any | ResponseData<T> | undefined> => {
  return POST('/system/user/signup');
};

/**
 * @name getUserProfile
 * @description 获取用户信息
 */
export const getUserProfile = <T>(): Promise<
  any | ResponseData<T> | undefined
> => {
  return GET('/system/user/profile');
};

/**
 * @name validateUsername
 * @description 校验用户名是否存在
 */
export const validateUsername = <T>(
  params: ValidateUsernameParams
): Promise<any | ResponseData<T> | undefined> => {
  return GET('/system/user/validate', params);
};

/**
 * @name validateUsername
 * @description 获取权限路由
 */
export const getRoleRoutes = <T>(): Promise<
  any | ResponseData<T> | undefined
> => {
  return GET('/system/user/routes');
};

/**
 * @name validateUsername
 * @description 校验用户名是否存在
 */
export const getUserRoles = <T>(): Promise<
  any | ResponseData<T> | undefined
> => {
  return GET('/system/user/roles');
};