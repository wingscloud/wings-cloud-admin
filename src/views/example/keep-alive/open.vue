<script lang="ts" setup>
defineOptions({
  name: 'ExampleKeepAliveOpen',
});

const num = ref<number>(3);
</script>
<template>
  <crud-card>
    <el-input-number v-model="num"></el-input-number>
  </crud-card>
</template>
