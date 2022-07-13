<template>
  <div>
    <van-nav-bar
      title="城市列表"
      left-arrow
      placeholder
      @click-left="onClickLeft"
    />
    <div class="box">
      <van-index-bar :index-list="compIndex">
        <van-index-anchor index="#">
          <p>当前城市</p>
          <van-cell :title="$store.state.nowAddress.label" />
        </van-index-anchor>

        <van-index-anchor index="热">
          <p>热门城市</p>
          <van-cell
            :title="item.label"
            v-for="item in hotAddress"
            :key="item.short"
            @click="address(item)"
          />
        </van-index-anchor>
        <van-index-anchor
          :index="obj.num"
          v-for="(obj, index) in compAddress"
          :key="index"
          ><p>{{ obj.num }}</p>
          <van-cell
            :index="obj.num"
            :title="item.label"
            v-for="(item, index) in obj"
            :key="index"
            @click="address(item)"
          />
        </van-index-anchor>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import { getAddressList, getHotAddress } from '@/api/address'
export default {
  created () {
    this.getAddressList()
    this.getHotAddress()
  },
  data () {
    return {
      allAddress: [],
      hotAddress: []
    }
  },
  methods: {
    address (obj) {
      this.$store.commit('changeAddress', obj)
      this.$router.go(-1)
    },
    async getHotAddress () {
      try {
        const res = await getHotAddress()
        console.log(res)
        this.hotAddress = res.data.body
      } catch (error) {
        console.log(error)
      }
    },
    async getAddressList () {
      try {
        const res = await getAddressList(1)
        console.log(res)
        this.allAddress = res.data.body
      } catch (error) {
        console.log(error)
      }
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  },
  computed: {
    compIndex () {
      let areaInd = this.allAddress.map((value) => {
        return value.short.slice(0, 1).toUpperCase()
      })
      areaInd = this.$arr.uniq(areaInd).sort()
      areaInd.unshift('#', '热')
      return areaInd
    },
    compAddress () {
      const allArea = []
      let areaInd = this.allAddress.map((value) => {
        return value.short.slice(0, 1)
      })
      areaInd = this.$arr.uniq(areaInd).sort()
      areaInd.forEach((val, index) => {
        allArea.push(this.allAddress.filter(value => {
          const a = value.short.slice(0, 1)
          return a === val
        }))
        allArea[index].num = val.toUpperCase()
      })
      console.log(allArea)
      return allArea
    }
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.box {
  padding-top: 46px;
}
/deep/.van-index-bar__sidebar {
  margin-top: 20px;
}
.van-index-bar {
  span {
    margin: 8px 0;
  }
}
/deep/.van-index-anchor {
  padding: 0;
}
.van-index-anchor {
  p {
    margin: 0;
    padding: 10px 15px;
    font-size: 14px;
    line-height: 14px;
    color: #999;
  }
}
.van-cell {
  border-bottom: 1px solid #eee;
  span {
    font-size: 16px;
    color: #666;
  }
}
/deep/.van-index-bar__index {
  margin: 6px 10px;
  padding: 0 !important;
  color: #333;
  font-size: 14px;
  width: 15px;
  height: 15px;
  line-height: 15px;
  border-radius: 50%;
}
/deep/.van-index-bar__index--active {
  background-color: #21b97a;
  color: #fff;
}
.van-nav-bar {
  position: fixed;
  top: 0;
  z-index: 19911;
  width: 100%;
}
</style>
