<template>
  <div>
    <van-nav-bar
      :title="data.community"
      left-arrow
      placeholder
      @click-left="$router.back()"
    />
    <div class="btnbox">
      <van-button block type="default" @click="FavoriteFn">
        <template #icon>
          <van-loading v-if="isLoding" />
          <van-icon
            v-else
            :name="isFavorite ? 'star ' : 'star-o'"
            :color="isFavorite ? '#ff4f00' : ''"
        /></template>
        收藏</van-button
      >
      <van-button block type="default">在线咨询</van-button>
      <van-button block color="#21b97a" type="primary">电话预约</van-button>
    </div>
    <div class="house-news">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(arr, index) in data.houseImg" :key="index"
          ><van-image :src="'http://liufusong.top:8080' + arr"
        /></van-swipe-item>
      </van-swipe>
      <div class="title">
        <div class="shang">
          <h2 v-if="false">暂无标题</h2>
          <h2 v-else>{{ data.community }}</h2>
          <div class="tags">
            <span v-for="(arr, index) in data.tags" :key="index">
              {{ arr }}
            </span>
          </div>
        </div>
        <div class="zhong">
          <div class="box">
            <span>{{ data.price }}</span
            >/月
            <p>租金</p>
          </div>
          <div class="box">
            <span>{{ data.roomType }}</span>
            <p>房型</p>
          </div>
          <div class="box">
            <span>{{ data.size }}</span
            >平米
            <p>面积</p>
          </div>
        </div>
        <div class="xia">
          <div class="box">
            <div class="row">装修： <span>精装</span></div>
            <div class="row">
              朝向： <span>{{ data.oriented[0] }}</span>
            </div>
          </div>
          <div class="box">
            <div class="row">
              楼层： <span>{{ data.floor }}</span>
            </div>
            <div class="row">类型： <span>普通住宅</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFavorites, addFavorites, delFavorites, getHouseNews } from '@/api/houseNew'
import { Toast } from 'vant'
export default {
  props: {
  },
  created () {
    this.getHouseNews()
  },
  data () {
    return {
      data: {},
      isFavorite: false,
      isLoding: false
    }
  },
  methods: {
    async FavoriteFn () {
      if (!this.isLoding) {
        try {
          if (this.isFavorite) {
            this.isLoding = true
            const res = await delFavorites(this.data.houseCode)
            this.isFavorite = false
            console.log(res)
          } else {
            this.isLoding = true
            const res = await addFavorites(this.data.houseCode)
            this.isFavorite = true
            console.log(res)
          }
          this.isLoding = false
        } catch (error) {
          Toast.fail('收藏失败')
          console.log(error)
        }
      }
    },
    async getFavorites () {
      try {
        const res = await getFavorites(this.data.houseCode)
        console.log(res.data.body.isFavorite)
        this.isFavorite = res.data.body.isFavorite
      } catch (error) {
        console.log(error)
      }
    },
    async getHouseNews () {
      try {
        const res = await getHouseNews(this.$route.params.houseid)
        console.log(res)
        this.data = res.data.body
        this.getFavorites()
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.btnbox {
  position: fixed;
  bottom: 0;
  width: 100vw;
  display: flex;
  button {
    font-size: 17px;
    color: #999;
  }
  button:nth-child(3) {
    color: #fff;
  }
}
.house-news {
  .van-swipe {
    .van-image {
      width: 100%;
    }
  }
  .title {
    padding: 0 10px 50px;
    h2 {
      font-size: 16px;
      font-weight: 400;
      color: #333;
    }
    .tags {
      span {
        display: inline-block;
        font-size: 12px;
        border-radius: 3px;
        padding: 4px 5px;
        margin-right: 5px;
        line-height: 12px;
      }
      span:nth-child(2n + 1) {
        color: #39becd;
        background: #e1f5f8;
      }
      span:nth-child(2n) {
        color: #3fc28c;
        background: #e1f5ed;
      }
    }
  }
  .zhong {
    margin: 15px 0;
    padding: 15px 0;
    border-top: 1px solid #cecece;
    border-bottom: 1px solid #cecece;
    display: flex;
    color: #999;
    .box {
      text-align: center;
      flex: 1;
      color: #fa5741;
      font-size: 12px;
      span {
        font-size: 18px;
        font-weight: 600;
      }
      p {
        color: #999;
        margin: 5px 0;
      }
    }
  }
  .xia {
    color: #999;
    font-size: 12px;
    .box {
      display: flex;
      div {
        line-height: 30px;
        flex: 1;
        padding-left: 3px;
        span {
          color: #333;
        }
      }
    }
  }
}
</style>
