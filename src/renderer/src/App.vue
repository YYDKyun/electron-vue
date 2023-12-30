<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

// function skipTest() {
//   router.push('/test')
// }
</script>

<style lang="less">
@import './assets/css/app.less';
</style>
