<script lang="ts" setup name="setting-layout">
const props = defineProps({
  mode: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  active: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div mr-7 mb-4>
    <div w-18 h-18 overflow-hidden cursor-pointer>
      <div class="bg" v-if="props.mode === 'auto'">
        <svg-icon name="color-scheme-auto" size="2rem"></svg-icon>
      </div>
      <div class="bg" v-if="props.mode === 'theme'">
        <svg-icon name="color-scheme-theme" size="2rem"></svg-icon>
      </div>
      <div class="bg" v-if="props.mode === 'light'">
        <svg-icon name="color-scheme-light" size="2rem"></svg-icon>
      </div>
      <div class="bg" v-if="props.mode === 'dark'">
        <svg-icon name="color-scheme-dark" size="2rem"></svg-icon>
      </div>
    </div>
    <div w-full h-2 flex items-center justify-center p-y-2>
      <div
        v-if="active"
        w-2
        h-2
        style="background-color: var(--el-color-primary); border-radius: 50%"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  --at-apply: flex items-center justify-center w-full h-full;

  box-sizing: border-box;
  margin: 0 auto;
  background-color: #262a3c;
  border-radius: 6px;
}
</style>
