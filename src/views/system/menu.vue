<script lang="ts" setup>
import { useRouteStore } from '@/hooks/use-store/use-route-store';
import { useSystemStore } from '@/hooks/use-store/use-system-store';
import { IconTypeEnum } from '@/constants/enums';

defineOptions({
  name: 'SystemMenu',
});

const { t } = useI18n();

const routeStore = useRouteStore();

const systemStore = useSystemStore();

const keepAliveChange = (val: string | number | boolean) => {
  console.log(val);
};
</script>
<template>
  <crud-card>
    <crud-table-query :query="false" :reset="false">
      <template #action>
        <el-button type="primary">{{ t('crud.btn.add') }}</el-button>
      </template>
    </crud-table-query>
    <crud-table :data="routeStore.menuRoutes" action-width="300" row-key="path">
      <el-table-column :label="t('system.menu.menu')" width="240">
        <template #default="scope">
          {{ scope.row.meta.menuName }}
        </template>
      </el-table-column>
      <el-table-column :label="t('system.menu.icon')" width="140">
        <template #default="scope">
          <svg-icon
            v-if="scope.row.meta.iconType === IconTypeEnum.APP"
            :name="scope.row.meta.icon"
          ></svg-icon>
          <el-icon v-if="scope.row.meta.iconType === IconTypeEnum.ELEMENT_PLUS">
            <component :is="scope.row.meta.icon"></component>
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column :label="t('system.menu.type')" width="140">
        <template #default="scope">
          <el-tag v-if="scope.row.meta.async">
            {{ t('system.menu.async') }}
          </el-tag>
          <el-tag v-else>
            {{ t('system.menu.static') }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="t('system.menu.open')" width="140">
        <template #default="scope">
          <el-tag v-if="scope.row.meta.externalPage">
            {{ t('system.menu.outside') }}
          </el-tag>
          <el-tag v-else>
            {{ t('system.menu.inside') }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="t('system.menu.keepAlive')" width="140">
        <template #default="scope">
          <el-switch
            v-model="scope.row.meta.keepAlive"
            @change="keepAliveChange"
          />
        </template>
      </el-table-column>
      <el-table-column :label="t('crud.table.sort')" width="140">
        <template #default="scope">
          {{ scope.row.meta.sort }}
        </template>
      </el-table-column>
      <el-table-column :label="t('system.menu.router')" width="240">
        <template #default="scope">
          {{ scope.row.path }}
        </template>
      </el-table-column>
      <el-table-column
        min-width="340"
        prop="remark"
        :label="t('crud.table.remark')"
      ></el-table-column>
      <el-table-column
        :label="t('crud.btn.action')"
        fixed="right"
        :width="systemStore.isMobile ? '120' : '300'"
      >
        <template #default="scope">
          <el-button type="primary" link>
            {{ t('system.menu.subMenu') }}
          </el-button>
          <el-button type="primary" link>
            {{ t('system.menu.permission') }}
          </el-button>
          <el-button type="primary" link>
            {{ t('crud.btn.edit') }}
          </el-button>
          <el-button
            type="primary"
            link
            v-if="!scope.row.children || scope.row.children.length === 0"
          >
            {{ t('crud.btn.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </crud-table>
  </crud-card>
</template>
