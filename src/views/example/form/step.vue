<script lang="ts" setup>
defineOptions({
  name: 'ExampleFormStep',
});

const { t } = useI18n();

const form = reactive({
  payAccount: '',
  getAccount: '',
  getName: '',
  price: 0,
  password: '',
});

const step = ref<number>(1);
</script>
<template>
  <crud-card>
    <el-steps
      align-center
      :active="step"
      w="60%"
      p-t-8
      p-b-14
      p-l-28
      style="margin: 0 auto"
    >
      <el-step :title="t('example.form.step.stepOne')" />
      <el-step :title="t('example.form.step.stepTwo')" />
      <el-step :title="t('example.form.step.stepThree')" />
    </el-steps>
    <crud-page-form
      action
      :model="form"
      label-width="180px"
      :submit-label="t('example.form.step.next')"
      v-if="step == 1"
      @submit="step = 2"
    >
      <el-form-item :label="t('example.form.step.payAccount')">
        <el-input
          v-model="form.payAccount"
          :placeholder="
            t('crud.placeholder.enter', {
              label: t('example.form.step.payAccount'),
            })
          "
        />
      </el-form-item>
      <el-form-item :label="t('example.form.step.getAccount')">
        <el-input
          v-model="form.getAccount"
          :placeholder="
            t('crud.placeholder.enter', {
              label: t('example.form.step.getAccount'),
            })
          "
        />
      </el-form-item>
      <el-form-item :label="t('example.form.step.getName')">
        <el-input
          v-model="form.getName"
          :placeholder="
            t('crud.placeholder.enter', {
              label: t('example.form.step.getName'),
            })
          "
        />
      </el-form-item>
      <el-form-item :label="t('example.form.step.price')">
        <el-input
          type="number"
          v-model="form.price"
          :placeholder="
            t('crud.placeholder.enter', {
              label: t('example.form.step.price'),
            })
          "
        >
          <template #append>{{ t('example.form.step.unit') }}</template>
        </el-input>
      </el-form-item>
    </crud-page-form>
    <crud-page-form
      action
      :model="form"
      label-width="180px"
      :submit-label="t('example.form.step.next')"
      v-if="step == 2"
      :cancel-label="t('example.form.step.pre')"
      @submit="step = 3"
      @cancel="step = 1"
    >
      <el-form-item :label="t('example.form.step.payAccount')">
        <div>test@test.com</div>
      </el-form-item>
      <el-form-item :label="t('example.form.step.getAccount')">
        <div>????????????</div>
      </el-form-item>
      <el-form-item :label="t('example.form.step.getName')">
        <div>??????</div>
      </el-form-item>
      <el-form-item :label="t('example.form.step.price')">
        <div>29000 ???</div>
      </el-form-item>
      <el-form-item :label="t('example.form.step.password')">
        <el-input
          v-model="form.password"
          :placeholder="
            t('crud.placeholder.enter', {
              label: t('example.form.step.password'),
            })
          "
        >
        </el-input>
      </el-form-item>
    </crud-page-form>
    <el-result
      icon="success"
      :title="t('example.form.step.success')"
      v-if="step == 3"
    >
      <template #extra>
        <el-button type="primary" @click="step = 1">
          {{ t('crud.btn.confirm') }}
        </el-button>
      </template>
    </el-result>
  </crud-card>
</template>
