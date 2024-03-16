<template>
  <component :is="type" v-bind="linkProps(to!)">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { isExternal } from '@/utils/validate.ts'

import {computed} from "vue";

const props = defineProps({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  to: String
})

const external = computed(() =>{
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return isExternal(props.to!)
})

const type = computed(() => {
      if (external.value) {
        return 'a'
      }
      return 'router-link'
    }
)

function linkProps(to: string){
  if (external.value) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return {
    to: to
  }
}

</script>

<style scoped lang="less">

</style>