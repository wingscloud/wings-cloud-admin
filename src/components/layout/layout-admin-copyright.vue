<script lang="ts" setup>
import { useSystemStore } from '@/hooks/use-store/use-system-store';

defineOptions({
  name: 'LayoutAdminCopyright',
});

const { t } = useI18n();

const systemStore = useSystemStore();
</script>

<template>
  <div
    flex
    items-center
    justify-center
    style="padding: var(--wings-cloud-main-padding) 0"
  >
    <div
      :class="systemStore.isMobile ? 'text-2' : 'text-4'"
      style="color: var(--el-text-color-secondary)"
    >
      {{ t('app.copyright') }}
    </div>
  </div>
</template>
