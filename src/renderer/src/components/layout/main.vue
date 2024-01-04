<template>
  <div>
    <el-container id="main">
      <el-header id="main-header">
        <div id="logo-icon">
          <el-image :src="headerIcon"></el-image>
        </div>
        <el-text id="logo">Calculator</el-text>
      </el-header>
      <el-container>
        <Aside/>
        <el-main id="main-main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup lang="ts">
import headerIcon from '@/assets/calculator.svg'
import Aside from "@/components/layout/aside.vue";

</script>

<style scoped lang="less">
@import '@/assets/css/main.less';
</style>
