<script lang="ts" setup>
import type { IObject } from '@/global.d';
import SignTemplate from '../components/sign-template.vue';
import VerifyMobilePhone from './components/verify-mobile-phone.vue';
import ChangePassword from './components/change-password.vue';
import { ElMessage } from 'element-plus';
import { RouteEnum } from '@/enums';

const { t } = useI18n();

const router = useRouter();

const forgetType = ref<string>('verify');

const verifyHandle = (e: IObject): void => {
  if (e.status) {
    changeResetType('change');
  }
};

const changeHandle = (e: IObject): void => {
  if (e.status) {
    ElMessage.success(t('pages.password.success'));
  }
};

const changeResetType = (type: string): void => {
  forgetType.value = type;
};

const goSignin = (): void => {
  router.replace({ path: RouteEnum.ROUTE_SIGNIN });
};
</script>
<template>
  <sign-template>
    <template #title>
      <div v-if="forgetType === 'verify'">
        <div mb-4 text-6 font-600 style="color: var(--el-color-info-light)">
          {{ t('pages.password.forget') }}
        </div>
        <div
          font-500
          style="color: var(--el-text-color-secondary); font-size: 14px"
        >
          {{ t('pages.password.forgetDescription') }}
        </div>
      </div>
      <div v-if="forgetType === 'change'">
        <div mb-4 text-6 font-600 style="color: var(--el-color-info-light)">
          {{ t('pages.password.create') }}
        </div>
        <div
          font-500
          style="color: var(--el-text-color-secondary); font-size: 14px"
        >
          {{ t('pages.password.createDescription') }}
        </div>
      </div>
    </template>
    <template #form>
      <verify-mobile-phone
        v-if="forgetType === 'verify'"
        @verify="verifyHandle"
      ></verify-mobile-phone>
      <change-password
        v-if="forgetType === 'change'"
        @change="changeHandle"
      ></change-password>
      <div p-t-20 flex items-center justify-center>
        <span
          text-4
          lh-1
          font-600
          pr-2
          style="color: var(--el-text-color-primary)"
        >
          {{ t('pages.password.rememebr') }}
        </span>
        <el-button text-4 p-0 link font-600 type="primary" @click="goSignin">
          {{ t('pages.signin.title', { text: t('app.name') }) }}
        </el-button>
      </div>
    </template>
  </sign-template>
</template>