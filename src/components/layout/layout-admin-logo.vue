<script lang="ts" setup name="layout-admin-logo">
import { Settings } from '@/constants/settings';
import { useSystemStore } from '@/hooks/use-store/use-system-store';
import { SettingsValueEnum } from '@/constants/enums';

const { t } = useI18n();

const router = useRouter();

const systemStore = useSystemStore();

const goHomeRoute = () => {
  router.push({ path: Settings.AdminFirstRoute });
};

const width = computed(() => {
  let _width = 'var(--wings-header-logo-width)';
  if (
    systemStore.collapse &&
    systemStore.settings.Layout !== SettingsValueEnum.LAYOUT_TOP &&
    systemStore.settings.Layout !== SettingsValueEnum.LAYOUT_TOP_LEAN
  ) {
    _width = 'var(--wings-aside-width-fold)';
  } else {
    _width = 'var(--wings-aside-width)';
  }
  if (
    systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP ||
    systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN
  ) {
    _width = 'var(--wings-header-logo-width)';
  }
  if (systemStore.isMobile) {
    _width = 'var(--wings-aside-width)';
  }
  return 'width:' + _width + ';';
});

const position = computed(() => {
  let _position = 'display:flex;align-items:center;';
  if (
    systemStore.settings.Layout !== SettingsValueEnum.LAYOUT_TOP &&
    systemStore.settings.Layout !== SettingsValueEnum.LAYOUT_TOP_LEAN
  ) {
    _position += 'justify-content:center;';
  } else if (
    systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP ||
    systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN
  ) {
    _position += 'justify-content:flex-start;';
  }
  return _position;
});
</script>

<template>
  <div
    class="layout-admin-logo"
    cursor-pointer
    p-x-6
    box-border
    @click="goHomeRoute()"
    :style="[width, position]"
  >
    <div class="logo" flex items-center justify-center>
      <img
        v-if="
          (systemStore.colorScheme === SettingsValueEnum.COLOR_SCHEME_THEME &&
            systemStore.settings.Layout !== SettingsValueEnum.LAYOUT_ASIDE &&
            systemStore.settings.Layout !==
              SettingsValueEnum.LAYOUT_ASIDE_LEAN) ||
          (systemStore.colorScheme !== SettingsValueEnum.COLOR_SCHEME_THEME &&
            (systemStore.settings.Layout ===
              SettingsValueEnum.LAYOUT_ASIDE_DARK ||
              systemStore.settings.Layout ===
                SettingsValueEnum.LAYOUT_ASIDE_LEAN_DARK))
        "
        w-10
        h-10
        src="@/assets/logo-white.svg"
      />
      <img v-else w-10 h-10 src="@/assets/logo.svg" />
    </div>
    <div
      w-full
      text-6
      font-600
      ml-4
      v-if="
        !systemStore.collapse ||
        systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP ||
        systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN
      "
      class="single-line-omitted name"
      :style="
        systemStore.settings.Layout === SettingsValueEnum.LAYOUT_ASIDE ||
        systemStore.settings.Layout === SettingsValueEnum.LAYOUT_ASIDE_DARK ||
        systemStore.settings.Layout === SettingsValueEnum.LAYOUT_ASIDE_LEAN
          ? 'color: var(--wings-menu-text-color)'
          : 'color: var(--wings-header-text-color)'
      "
    >
      {{ t('app.name') }}
    </div>
  </div>
</template>