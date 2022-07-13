<template>
  <div
    class="box"
    @click="
      $router.push({
        name: 'house',
        params: { houseid: houseData.houseCode },
      })
    "
  >
    <van-image
      :src="'http://liufusong.top:8080' + houseData.houseImg"
    />
    <div class="rightbox">
      <h3 class="van-ellipsis">{{ houseData.title }}</h3>
      <p>{{ houseData.desc }}</p>
      <div class="tags">
        <span v-for="(text, index) in houseData.tags" :key="index">{{
          text
        }}</span>
      </div>
      <div class="pic">
        <span>{{ houseData.price }} </span>元/月
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    houseData: {
      type: Object,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.box {
  display: flex;
  height: 110px;
  width: 100%;
  padding: 18px 15px 0;
  border-bottom: 1px solid #e5e5e5;
  .van-image {
    width: 106px;
    height: 80px;
    margin-right: 10px;
  }
  .rightbox {
    display: inline-block;
    height: 80px;
    width: 200px;
    h3 {
      margin: 2px 0;
      font-size: 15px;
      color: #394043;
    }
    p {
      font-size: 12px;
      color: #afb2b3;
      margin: 0;
    }
    .tags {
      span {
        padding: 4px 5px;
        margin-right: 5px;
        line-height: 12px;
        font-size: 12px;
      }
      span:nth-child(2n) {
        color: #3fc28c;
        background: #e1f5ed;
      }
      span:nth-child(2n + 1) {
        color: #39becd;
        background: #e1f5f8;
      }
    }
    .pic {
      margin-top: 5px;
      font-size: 12px;
      color: #fa5741;
      span {
        color: #fa5741;
        font-size: 16px;
      }
    }
  }
}
</style>
