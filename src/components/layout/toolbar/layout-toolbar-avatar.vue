<script lang="ts" setup>
import { RouteEnum } from '@/constants/enums';
import { useUserStore } from '@/hooks/use-store/use-user-store';
import { UserFilled } from '@element-plus/icons-vue';

defineOptions({
  name: 'LayoutToolbarAvatar',
});

const props = defineProps({
  avatarSize: {
    type: Number,
    default: 38,
  },
});

const { t } = useI18n();

const router = useRouter();

const userStore = useUserStore();

const actionChange = (command: string): void => {
  if (command.indexOf('/') !== -1) {
    router.push({ path: command });
  } else if (command === 'switchRoles') {
    userStore.switchRoles();
  } else if (command === 'signout') {
    userStore.logout();
  }
};
</script>
<template>
  <el-dropdown @command="actionChange">
    <el-avatar
      cursor-pointer
      :size="props.avatarSize"
      :src="userStore.userProfile.avatar"
      :icon="UserFilled"
    >
    </el-avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="swtichRoles">
          <el-icon><CollectionTag /></el-icon>
          <span>{{ t('app.toolbar.avatar.switchRoles') }}</span>
        </el-dropdown-item>
        <el-dropdown-item :command="RouteEnum.ROUTE_SYSTEM_PROFILE">
          <el-icon><User /></el-icon>
          <span>{{ t('system.profile.menuName') }}</span>
        </el-dropdown-item>
        <el-dropdown-item :command="RouteEnum.ROUTE_SYSTEM_NOTIFICATION">
          <el-icon><ChatLineRound /></el-icon>
          <span>{{ t('system.notification.menuName') }}</span>
        </el-dropdown-item>
        <el-dropdown-item :command="RouteEnum.ROUTE_SYSTEM_SETTINGS">
          <el-icon><Setting /></el-icon>
          <span>{{ t('system.setting.menuName') }}</span>
        </el-dropdown-item>
        <el-dropdown-item command="signout">
          <el-icon><SwitchButton /></el-icon>
          <span>{{ t('app.toolbar.avatar.signout') }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
