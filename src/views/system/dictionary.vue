<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core';
import { useCrud } from '@/hooks/use-crud/use-crud';
import { useDictionary } from '@/hooks/use-crud/use-dictionary';

defineOptions({
  name: 'SystemDictionary',
});

const { t } = useI18n();

const { getDictionary, getDictionaryData } = useDictionary();

const { queryForm, tableData, query, reset } = useCrud({
  queryUrl: '/system/dictionary/list',
});
</script>
<template>
  <crud-card>
    <crud-table-query>
      <el-form-item :model="queryForm" @query="query" @reset="reset">
        <el-input
          v-model="queryForm.name"
          :placeholder="t('system.dictionary.dictionaryName')"
        />
      </el-form-item>
      <el-form-item>
        <el-select
          clearable
          v-model="queryForm.type"
          :placeholder="t('system.dictionary.dictionaryType')"
        >
          <el-option
            v-for="(item, index) in getDictionaryData('dictionaryType').value"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <template #action>
        <el-button type="primary">{{ t('crud.btn.add') }}</el-button>
      </template>
    </crud-table-query>
    <crud-table :data="tableData">
      <el-table-column
        type="index"
        width="60"
        :label="t('crud.table.no')"
      ></el-table-column>
      <el-table-column
        prop="key"
        :label="t('system.dictionary.dictionaryName')"
        width="240"
      ></el-table-column>
      <el-table-column
        prop="value"
        :label="t('system.dictionary.dictionaryType')"
        width="240"
      >
        <template #default="scope">
          <el-tag>
            {{ getDictionary('dictionaryType', scope.row.type) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="t('system.dictionary.dictionaryItem')"
        width="240"
      >
        <template #default>
          <el-button type="primary" link>
            {{ t('system.dictionary.dictionaryItem') }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        min-width="340"
        :label="t('crud.table.remark')"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        :label="t('system.role.createTime')"
        width="240"
      >
        <template #default="scope">
          {{ useDateFormat(scope.row.createTime, 'YYYY-MM-DD HH:mm:ss').value }}
        </template>
      </el-table-column>
      <el-table-column :label="t('crud.btn.action')" fixed="right" width="120">
        <el-button type="primary" link>
          {{ t('crud.btn.edit') }}
        </el-button>
        <el-button type="primary" link>
          {{ t('crud.btn.delete') }}
        </el-button>
      </el-table-column>
    </crud-table>
  </crud-card>
</template>
