<template>
  <el-aside width="20%">
    <el-menu
        :default-active="activeMenu">
      <SidebarItem v-for="item in allRoutes" :key="item.path" :item="item" :base-path="item.path"/>
    </el-menu>

  </el-aside>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import SidebarItem from "@/components/layout/sidebar/SidebarItem.vue";
const router = useRouter();
const route = useRoute()
import { computed } from 'vue'

// 获取所有路由配置
const allRoutes = router.options.routes;

const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

</script>

<style scoped lang="less">

</style>
