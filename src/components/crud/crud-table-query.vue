<script lang="ts" setup>
import type { ComponentInternalInstance } from 'vue';

defineOptions({
  name: 'CrudTableQuery',
});

const { slots } = getCurrentInstance() as ComponentInternalInstance;

const { t } = useI18n();

const props = defineProps({
  query: {
    type: Boolean,
    default: true,
  },
  reset: {
    type: Boolean,
    default: true,
  },
  queryLabel: {
    type: String,
    default: '',
  },
  resetLabel: {
    type: String,
    default: '',
  },
});
</script>
<template>
  <div class="wings-cloud-crud-table-query">
    <el-form v-bind="$attrs" inline>
      <slot></slot>
      <el-form-item>
        <el-button @click="$attrs.onQuery" v-if="props.query">
          {{ props.queryLabel || t('crud.btn.query') }}
        </el-button>
        <el-button @click="$attrs.onReset" v-if="props.reset">
          {{ props.resetLabel || t('crud.btn.reset') }}
        </el-button>
        <slot name="action"></slot>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss">
.wings-cloud-crud-table-query {
  .el-form-item {
    width: 200px !important;
    margin-right: 20px !important;

    &:last-child {
      width: auto !important;
      margin-right: 0 !important;
    }
  }
}
</style>
