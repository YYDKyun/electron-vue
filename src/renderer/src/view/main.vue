<template>
  <div>
    <el-container>
      <el-header id="main-header">
        <div id="logo-icon">
          <el-image :src="headerIcon"></el-image>
        </div>
        <el-text id="logo">Calculator</el-text>
      </el-header>
      <el-container>
        <el-aside width="20%">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup lang="ts">
import headerIcon from '@/assets/calculator.svg'


</script>

<style scoped lang="less">
@import '@/assets/css/main.less';
</style>