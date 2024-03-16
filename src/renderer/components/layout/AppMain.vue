<template>
  <section class="app-main">
<!--    <transition name="fade-transform" mode="out-in">-->
    <div id="appMain">
      <el-scrollbar height="100%">
        <router-view :key="key" />
      </el-scrollbar>

    </div>

<!--    </transition>-->
  </section>
</template>

<script lang="ts">


export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    },
  }
}
</script>


<style scoped>
#appMain{
  margin-left: 15px;
  background: #ffffff;
  height: calc(100vh - 75px);
}

</style>
