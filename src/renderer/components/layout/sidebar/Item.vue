<template>
  <template v-if="props.icon != undefined" >
    <el-icon v-if="icon!.includes('el-icon') ">
      <component :is="iconName" />
    </el-icon>
    <svg-icon v-else :name="icon as string" class="el-icon"/>
  </template>

  <span>
    {{title}}
  </span>
</template>


<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon/index.vue";

const props = defineProps({
  icon: String,
  title: String
})


let iconName: string
if (props.icon ){
  iconName = props.icon.slice('el-icon-'.length)
}





</script>

<style scoped lang="less">
.sub-el-icon {
  width: 1em;
  height: 1em;
  margin-right: 5px;
}
</style>