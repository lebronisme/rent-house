<template>
  <div>
    <van-search
      v-model="value"
      show-action
      background="transparent"
      label="地址"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #label>
        <van-button type="primary" size="mini" to="address">{{
          $store.state.nowAddress.label
        }}</van-button>
      </template>
      <template #action>
        <van-icon
          name="location-o"
          size="large "
          @click="$router.push('/map')"
          color="#fff"
        />
      </template>
    </van-search>

    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      :height="212"
      indicator-color="white"
    >
      <van-swipe-item>
        <van-image
          width="375"
          height="212"
          src="http://liufusong.top:8080/img/swiper/1.png"
        />
      </van-swipe-item>
      <van-swipe-item>
        <van-image
          width="375"
          height="212"
          src="http://liufusong.top:8080/img/swiper/2.png"
        />
      </van-swipe-item>
      <van-swipe-item>
        <van-image
          width="375"
          height="212"
          src="http://liufusong.top:8080/img/swiper/3.png"
        />
      </van-swipe-item>
    </van-swipe>
    <van-grid>
      <van-grid-item to="houselist">
        <template #icon>
          <img
            src="@/assets/home1.png"
            style="width: 60px; height: 60px"
            alt=""
          />
        </template>
        <template #text>
          <h2>整租</h2>
        </template>
      </van-grid-item>
      <van-grid-item to="houselist">
        <template #icon>
          <img
            src="@/assets/home2.png"
            style="width: 60px; height: 60px"
            alt=""
          />
        </template>
        <template #text>
          <h2>合租</h2>
        </template>
      </van-grid-item>
      <van-grid-item @click="$router.push('/map')">
        <template #icon>
          <img
            src="@/assets/home3.png"
            style="width: 60px; height: 60px"
            alt=""
          />
        </template>
        <template #text>
          <h2>地图找房</h2>
        </template>
      </van-grid-item>
      <van-grid-item @click="$router.push('/lease')">
        <template #icon>
          <img
            src="@/assets/home4.png"
            style="width: 60px; height: 60px"
            alt=""
          />
        </template>
        <template #text>
          <h2>去出租</h2>
        </template>
      </van-grid-item>
    </van-grid>
    <div class="boxgroup">
      <div class="box">
        <h3>租房小组</h3>
        <p>更多</p>
      </div>
      <van-grid direction="horizontal" :column-num="2" :gutter="10">
        <van-grid-item v-for="item in groupInfo" :key="item.id">
          <template #icon>
            <van-image
              round
              width="50px"
              height="50px"
              :src="'http://liufusong.top:8080' + item.imgSrc"
            />
          </template>
          <template #text>
            <div>
              <p>{{ item.desc }}</p>
              <p>{{ item.title }}</p>
            </div>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getGroupInfo } from '@/api/home'
export default {
  created () {
    this.getGroupInfo()
  },
  data () {
    return {
      value: '',
      groupInfo: {}
    }
  },
  methods: {
    async getGroupInfo () {
      try {
        const res = await getGroupInfo()
        // console.log(res)
        if (res.data.status === 200) {
          this.groupInfo = res.data.body
        } else {
          console.log(res.data.description)
        }
      } catch (error) {
        console.log(error)
      }
    },
    onSearch () { }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.my-swipe .van-swipe-item {
  color: #fff;
  line-height: 75px;
  text-align: center;
  height: 212px;
}
.van-search {
  height: 34px;
  width: 100%;
  position: absolute;
  top: 25px;
  left: 0;
  z-index: 1;
  .van-cell {
    align-items: center;
  }
}
.van-button {
  line-height: 68px;
}
.van-button--mini {
  height: 34px;
}
.van-field__body {
  height: 29px;
}
.van-search__label {
  display: flex;
  align-items: center;
}
.van-grid {
  padding-bottom: 10px;
  .van-grid-item {
    /deep/ .van-grid-item__content {
      padding: 10px 8px;
      img {
        margin-top: 0;
      }
      h2 {
        margin: 8px 0 0 0;
        color: #333;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
}
.boxgroup {
  background-color: #f6f5f6;
  // padding: 0 10px;
  .box {
    display: flex;
    justify-content: space-between;
    h3 {
      font-size: 15px;
      color: #333;
      margin-left: 20px;
    }
    p {
      font-size: 14px;
      margin-right: 10px;
      color: #787d82;
    }
  }
  .van-grid {
    .van-grid-item {
      p {
        font-size: 14px;
        color: #333;
        font-weight: 400;
        margin: 0;
      }
    }
  }
}
</style>
