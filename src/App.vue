<template>
<div class="main">
  <!-- 保持缓存，不重新加载 -->
    <keep-alive>
      <!-- 一级占位符 -->
      <router-view></router-view>
    </keep-alive>
</div>
</template>

<script>
export default {
  created () {},
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>

</style>
