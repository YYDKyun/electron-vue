<template>
  <div>
    <el-container>
      <el-header id="main-header">
        <div id="logo-icon">
          <SvgIcon name="calculator" color="#FFFFFF"/>
        </div>
        <el-text id="logo">Calculator</el-text>
      </el-header>
      <el-container>
        <Aside/>
        <AppMain id="main-main"/>
      </el-container>
    </el-container>
  </div>
</template>


<script setup lang="ts">
// import headerIcon from '@/icons/svg/calculator.svg'
import Aside from "@/components/layout/sidebar/aside.vue"
import AppMain from "@/components/layout/AppMain.vue"
import SvgIcon from "@/components/SvgIcon/index.vue";

</script>

<style scoped lang="less">
@import '@/assets/css/main';
</style>
