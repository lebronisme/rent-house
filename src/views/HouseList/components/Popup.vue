<template>
  <div class="main">
    <div class="btn-box">
      <van-button type="primary" block @click="clearFn">清除</van-button>
      <van-button color="#1cb676" @click="offMenu" type="primary" block
        >确认</van-button
      >
    </div>
    <div class="bottom">
      <!-- 户型 -->
      <div class="roomtype checked">
        <h4>户型</h4>
        <div class="btns">
          <van-checkbox-group v-model="more">
            <van-cell-group>
              <van-cell
                v-for="(obj, index) in menuData.roomType"
                :key="index"
                @click="toggle1(index)"
                :class="{ Press: more.some((v) => v == obj.value) }"
              >
                <van-checkbox :name="obj.value" ref="checkboxes1">
                  <template #icon
                    ><div class="text">{{ obj.text }}</div></template
                  >
                </van-checkbox>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </div>
      </div>
      <!-- 朝向 -->
      <div class="oriented">
        <h4>朝向</h4>
        <div class="btns">
          <van-checkbox-group v-model="more">
            <van-cell-group>
              <van-cell
                v-for="(obj, index) in menuData.oriented"
                :key="index"
                @click="toggle2(index)"
                :class="{ Press: more.some((v) => v == obj.value) }"
              >
                <van-checkbox :name="obj.value" ref="checkboxes2">
                  <template #icon
                    ><div class="text">{{ obj.text }}</div></template
                  >
                </van-checkbox>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </div>
      </div>
      <!-- 楼层 -->
      <div class="floor">
        <h4>朝向</h4>
        <div class="btns">
          <van-checkbox-group v-model="more">
            <van-cell-group>
              <van-cell
                v-for="(obj, index) in menuData.floor"
                :key="index"
                @click="toggle3(index)"
                :class="{ Press: more.some((v) => v == obj.value) }"
              >
                <van-checkbox :name="obj.value" ref="checkboxes3">
                  <template #icon
                    ><div class="text">{{ obj.text }}</div></template
                  >
                </van-checkbox>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </div>
      </div>
      <!-- 房屋亮点 -->
      <div class="characteristic">
        <h4>朝向</h4>
        <div class="btns">
          <van-checkbox-group v-model="more">
            <van-cell-group>
              <van-cell
                v-for="(obj, index) in menuData.characteristic"
                :key="index"
                @click="toggle4(index)"
                :class="{ Press: more.some((v) => v == obj.value) }"
              >
                <van-checkbox :name="obj.value" ref="checkboxes4">
                  <template #icon
                    ><div class="text">{{ obj.text }}</div></template
                  >
                </van-checkbox>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuData: {
      type: [Object, Array],
      required: true
    }
  },
  created () { },
  data () {
    return {
      more: []
    }
  },
  methods: {
    toggle1 (index) {
      this.$refs.checkboxes1[index].toggle()
    },
    toggle2 (index) {
      this.$refs.checkboxes2[index].toggle()
    },
    toggle3 (index) {
      this.$refs.checkboxes3[index].toggle()
    },
    toggle4 (index) {
      this.$refs.checkboxes4[index].toggle()
    },
    clearFn () {
      this.more = []
    },
    offMenu () {
      this.$emit('submit', this.more)
    }
  },
  computed: {
  },
  watch: {
    checked: {
      handler (newval) {
        console.log(newval)
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/.Press {
  background-color: #defaef;
  border-color: #21b97a !important;
}
/deep/.Press .text {
  color: #21b97a !important;
}

.btns {
  .van-checkbox-group {
    margin: 0 0 0 40px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e5e5 !important;
    .van-cell-group {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .van-cell {
        overflow: visible;
        min-width: 70px;
        max-width: 75px;
        min-height: 32px;
        max-height: 35px;
        padding: 0;
        line-height: 32px;
        border: 1px solid #ddd;
        border-radius: 3px;
        margin: 0 20px 20px 0;
        .van-checkbox {
          justify-content: center;
          overflow: visible;
          text-align: center;
          .text {
            display: inline-block;
            font-size: 12px;
            color: #888;
          }
        }
      }
    }
  }
}

.bottom {
  h4 {
    font-weight: 400;
    font-size: 15px;
  }
}
.main {
  padding: 0  0 0 15px ;
  position: relative;
  height: 100%;
  top: 0;
  overflow: hidden;
}
.bottom {
  overflow: auto;
  height: calc(100vh - 45px);
}
.btn-box {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99999;
  width: 100%;
  display: flex;
  border-top: 1px solid #e9e9e9;
  .van-button:nth-child(1) {
    flex: 1;
  }
  .van-button:nth-child(2) {
    flex: 2;
  }
}
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border: 0;
}
.van-checkbox__icon {
  min-width: 70px;
  min-height: 32px;
}
</style>
