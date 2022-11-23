<script lang="ts" setup name="layout-admin">
import { useSystemStore } from '@/hooks/use-store/use-system-store';
import { SettingsValueEnum } from '@/constants/enums';

const systemStore = useSystemStore();
</script>

<template>
  <div
    :class="[
      systemStore.colorScheme,
      systemStore.settings.Layout,
      'layout-admin',
    ]"
  >
    <el-container>
      <el-header
        :style="
          systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP ||
          systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN
            ? 'height: var(--wings-header-height); border-bottom: 1px solid'
            : 'height: 0; border-bottom: none;'
        "
      >
        <layout-admin-header
          v-if="
            systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP ||
            systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN
          "
        ></layout-admin-header>
      </el-header>
      <el-container>
        <el-aside
          :style="[
            !systemStore.isMobile &&
            systemStore.settings.Layout !== SettingsValueEnum.LAYOUT_TOP_LEAN
              ? systemStore.collapse
                ? 'width: var(--wings-aside-width-fold)'
                : 'width: var(--wings-aside-width)'
              : 'width: 0',
            systemStore.isMobile ? 'border:none' : '',
          ]"
        >
          <layout-admin-aside
            v-if="
              !systemStore.isMobile &&
              systemStore.settings.Layout !== SettingsValueEnum.LAYOUT_TOP_LEAN
            "
          ></layout-admin-aside>
        </el-aside>
        <el-main
          :style="
            systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP ||
            systemStore.settings.Layout === SettingsValueEnum.LAYOUT_TOP_LEAN
              ? 'height: calc(100vh - var(--wings-header-height));'
              : 'height: calc(100vh);'
          "
        >
          <el-header
            :style="
              systemStore.settings.Layout === SettingsValueEnum.LAYOUT_ASIDE ||
              systemStore.settings.Layout ===
                SettingsValueEnum.LAYOUT_ASIDE_DARK
                ? 'height: var(--wings-header-height); border-bottom: 1px solid'
                : 'height: 0; border-bottom: none'
            "
          >
            <layout-admin-header
              v-if="
                systemStore.settings.Layout ===
                  SettingsValueEnum.LAYOUT_ASIDE ||
                systemStore.settings.Layout ===
                  SettingsValueEnum.LAYOUT_ASIDE_DARK
              "
            ></layout-admin-header>
          </el-header>
          <layout-admin-tab v-if="systemStore.settings.Tab"></layout-admin-tab>
          <layout-admin-main>
            <template #main-router-view>
              <slot name="router-view"></slot>
            </template>
          </layout-admin-main>
          <el-footer v-if="systemStore.settings.Footer">
            <layout-admin-footer></layout-admin-footer>
          </el-footer>
        </el-main>
      </el-container>
    </el-container>
    <layout-toolbar-mobile-menu
      v-if="
        systemStore.isMobile &&
        (systemStore.settings.Layout === SettingsValueEnum.LAYOUT_ASIDE_LEAN ||
          systemStore.settings.Layout ===
            SettingsValueEnum.LAYOUT_ASIDE_LEAN_DARK)
      "
      :fixed="true"
    ></layout-toolbar-mobile-menu>
    <el-drawer
      v-model="systemStore.mobileMenu"
      :show-close="false"
      direction="ltr"
      :with-header="false"
      size="var(--wings-aside-width)"
    >
      <layout-admin-aside></layout-admin-aside>
    </el-drawer>
    <layout-toolbar
      v-if="
        systemStore.settings.Layout === SettingsValueEnum.LAYOUT_ASIDE_LEAN ||
        systemStore.settings.Layout === SettingsValueEnum.LAYOUT_ASIDE_LEAN_DARK
      "
      :fixed="true"
    ></layout-toolbar>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-header) {
  box-sizing: border-box;
  padding: 0 !important;
  overflow: hidden;
  background-color: var(--wings-header-bg-color);
  border-color: var(--wings-header-border-color) !important;
  transition: all var(--el-transition-duration)
    var(--el-transition-function-ease-in-out-bezier);
}

:deep(.el-container) {
  box-sizing: border-box;
  overflow: hidden;
  background-color: var(--wings-menu-bg-color);
  transition: all var(--el-transition-duration)
    var(--el-transition-function-ease-in-out-bezier);
}

:deep(.el-aside) {
  box-sizing: border-box;
  overflow: hidden;
  border-right: 1px solid var(--wings-aside-border-color);
  transition: all var(--el-transition-duration)
    var(--el-transition-function-ease-in-out-bezier);
}

:deep(.el-main) {
  box-sizing: border-box;
  padding: 0;
  overflow: hidden;
  background: var(--wings-main-fill);
  transition: all var(--el-transition-duration)
    var(--el-transition-function-ease-in-out-bezier);
}
</style>