<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <van-tabbar route >
      <van-tabbar-item replace icon="wap-home-o" to="/home">首页
      </van-tabbar-item>
      <van-tabbar-item replace icon="search" to="/houselist"
        >找房</van-tabbar-item
      >
      <van-tabbar-item replace icon="newspaper-o" to="/infolist"
        >资讯</van-tabbar-item
      >
      <van-tabbar-item replace icon="contact" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      active: 0
    }
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
