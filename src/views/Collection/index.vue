<template>
  <div>
    <van-nav-bar
      :title="$route.query.title"
      left-arrow
      placeholder
      @click-left="$router.back()"
    />
    <div class="list">
      <Card v-for="(obj, index) in list" :key="index" :houseData="obj"></Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import { getFavoritesList, getUpHousesList } from '@/api/user'
export default {
  created () {
    this.getList()
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    async getList () {
      try {
        if (this.$route.query.title === '我的收藏') {
          const res = await getFavoritesList()
          this.list = res.data.body
          console.log(res)
        } else {
          const res = await getUpHousesList()
          this.list = res.data.body
          console.log(res)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { Card }
}
</script>

<style scoped lang='less'>
</style>
