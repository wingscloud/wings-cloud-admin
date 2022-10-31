import type {
  Router,
  RouteLocationNormalized,
  NavigationGuardNext,
} from 'vue-router';
import type { Roles } from '../../hooks/use-store/index.d';
import { DefaultSettings } from '../../settings';
import { RouteEnum, StorageEnum } from '../../enums';
import { useBaseStore } from '../../hooks/use-store/use-base-store';
import { useRouteStore } from '../../hooks/use-store/use-route-store';
import { useUserStore } from '../../hooks/use-store/use-user-store';
import { getStorage } from '../../utils/storage';
import { getLoginStorageType } from '../../utils/common';

/**
 * @name addRouterGuard
 * @description 注入路由拦截器
 * @returns
 */
export const addRouterGuard = (router: Router): Router => {
  // 前置拦截
  router.beforeEach(
    async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      // 获取权限数据
      const userRoles: Roles = getStorage(StorageEnum.USER_ROLES, {
        type: getLoginStorageType(),
      });
      const requiresAuth: boolean = to.matched.some(
        (item: any) => item.meta.requiresAuth
      );

      // 初始化全局状态
      const baseStore = useBaseStore();
      const routeStore = useRouteStore();
      const userStore = useUserStore();

      // 未登录跳转登录页
      if (requiresAuth && !userStore.isLogin) {
        next({
          path: RouteEnum.ROUTE_LOGIN + '?type=' + DefaultSettings.LoginType,
        });
        return;
      }

      // 页面刷新时初始化路由信息
      if (userStore.isLogin && routeStore.roleRoutes.length == 0) {
        baseStore.loading = true;
        await userStore.getUserProfile();
        await userStore.getUserRoles();
        await routeStore.getRoleRoutes();
        baseStore.loading = false;
        if (to.redirectedFrom) {
          next({ path: to.redirectedFrom.fullPath, replace: true });
        } else {
          next({ ...to, replace: true });
        }
        return;
      }

      // 鉴权处理
      if (userStore.isLogin && requiresAuth && !userRoles.includes(to.path)) {
        next({
          path: RouteEnum.ROUTE_NO_PERMISSION,
        });
        return;
      }

      next();
    }
  );

  // 解析拦截
  router.beforeResolve(async (to: RouteLocationNormalized) => {});

  // 后置拦截
  router.afterEach(
    (to: RouteLocationNormalized, from: RouteLocationNormalized) => {}
  );

  return router;
};
