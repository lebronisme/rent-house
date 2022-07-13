<template>
  <div>
    <van-nav-bar left-arrow title="地图找房" @click-left="$router.back()" />
    <div id="container"></div>
  </div>
</template>

<script>
import { getMapInfo } from '@/api/map'
export default {
  mounted () {

  },
  created () { this.getMapInfo() },
  data () {
    return {
      id: this.$store.state.nowAddress.value
    }
  },
  methods: {
    async getMapInfo () {
      const res = await getMapInfo(this.id)
      console.log(res)
      this.mapText(res.data.body)
    },
    mapText (mapArr) {
      const { BMapGL } = window
      const map = new BMapGL.Map('container')
      map.centerAndZoom(new BMapGL.Point(mapArr[0].coord.longitude, mapArr[0].coord.latitude), 11)
      map.enableScrollWheelZoom(true)
      mapArr.forEach(obj => {
        // console.log(obj)
        const opts = {
          position: new BMapGL.Point(obj.coord.longitude, obj.coord.latitude), // 指定文本标注所在的地理位置
          offset: new BMapGL.Size(30, -30) // 设置文本偏移量
        }
        // 创建文本标注对象
        const label = new BMapGL.Label(`<span>${obj.label}</span><br/><span>${obj.count}套</span>`, opts)
        // 自定义文本标注样式
        label.setStyle({
          color: '#fff',
          borderColor: '#fff',
          backgroundColor: '#23bb78',
          padding: '14px 0 0',
          fontSize: '12px',
          textAlign: 'center',
          boxSizing: ' border-box',
          lineHeight: '18px',
          height: '70px',
          width: '70px',
          borderRadius: '50%',
          fontFamily: '微软雅黑'
        })
        map.addOverlay(label)
      })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0px;
  padding: 0px;
}
#container {
  height: 100vh;
}
/deep/p {
  text-align: center;
  margin: 0 !important;
}
</style>
