<template>
  <div v-if="!item?.meta?.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild!.children || onlyOneChild!.meta!.noShowingChildren)
      "
    >
      <app-link v-if="onlyOneChild!.meta" :to="resolvePath(onlyOneChild!.path)">
        <el-menu-item :index="resolvePath(onlyOneChild!.path)">
          <item :icon="onlyOneChild!.meta.icon" :title="onlyOneChild!.meta.title"></item>
        </el-menu-item>
      </app-link>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)">
      <template #title>
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title"></item>
      </template>
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import AppLink from './Link.vue'
import Item from '@/components/layout/sidebar/Item.vue'
import { PropType } from 'vue'
import { isExternal } from '@/utils/validate.ts'
import { resolve } from 'path-browserify'
import { RouteRecordRaw } from 'vue-router'
import { ref } from 'vue'

const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    required: true
  },
  basePath: {
    type: String,
    default: ''
  }
})

// const onlyOneChild = ref<RouteRecordRaw | null>(null)

// function hasOneShowingChild(children: RouteRecordRaw[] = [], parent: RouteRecordRaw) {
//   const showingChildren = children.filter((item) => {
//     if (item.meta?.hidden) {
//       return false
//     } else {
//       onlyOneChild.value = item
//       return true
//     }
//   })
//   if (showingChildren.length === 1) {
//     return true
//   }

//   if (showingChildren.length === 0) {
//     onlyOneChild.value = { ...parent }

//     onlyOneChild.value.path = ''

//     onlyOneChild.value.meta = {
//       ...onlyOneChild.value.meta,
//       noShowingChildren: true
//     }
//     return true
//   }

//   return false
// }

const onlyOneChild = ref() // 临时变量，唯一子路由
function hasOneShowingChild(children: RouteRecordRaw[] = [], parent: RouteRecordRaw) {
  // 子路由集合
  const showingChildren = children.filter((route: RouteRecordRaw) => {
    if (route.meta?.hidden) {
      // 过滤不显示的子路由
      return false
    } else {
      route.meta!.hidden = false
      // 临时变量（多个子路由 onlyOneChild 变量是用不上的）
      onlyOneChild.value = route
      return true
    }
  })
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }
  return false
}

function resolvePath(routePath: string) {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return resolve(props.basePath, routePath)
}
</script>

<style scoped lang="less"></style>
