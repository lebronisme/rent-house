<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.back()">
      <template #title>
        <van-search
          v-model="value"
          show-action
          label="地址"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          ><template #label>
            <van-button type="primary" size="mini" to="address">{{
              $store.state.nowAddress.label
            }}</van-button>
          </template>
          <template #action>
            <van-icon name="location" @click="$router.push('/map')" size="24" />
          </template>
        </van-search>
      </template>
    </van-nav-bar>
    <van-sticky>
      <!-- 下拉菜单开始 -->
      <van-dropdown-menu>
        <!-- 区域子菜单 -->
        <van-dropdown-item title="区域" ref="item1">
          <!-- ref、绑定元素、用于关闭此项下拉菜单、每个菜单都需要单独绑定点击事件 -->
          <van-picker
            ref="val1"
            :default-index="0"
            :columns="areaList"
            @change="onArea"
          />
          <!-- ↑↑↑ ref、绑定选择器、用于获取选择器当前选择的数据、每个选择器使用不同的ref
          default-index、默认选中项的索引
             columns、读取数组生成选择器列表    -->
          <div class="box">
            <van-button type="primary" block @click="onConfirm1"
              >取消</van-button
            >
            <!-- 取消按钮、关闭此项选择器按钮 -->
            <van-button color="#1cb676" @click="okFn1" type="primary" block
              >确认
              <!-- 确认按钮、确认后刷新并关闭选择器 -->
            </van-button>
          </div>
        </van-dropdown-item>
        <!-- 区域子菜单 -->

        <!-- 方式子菜单 -->
        <van-dropdown-item title="方式" ref="item2">
          <!-- ref、绑定元素、用于关闭此项下拉菜单、每个菜单都需要单独绑定点击事件 -->
          <van-picker
            ref="val2"
            :default-index="1"
            :columns="allInfo.rentType"
            @change="onMode"
          />
          <!-- ↑↑↑ ref、绑定选择器、用于获取选择器当前选择的数据、每个选择器使用不同的ref
          default-index、默认选中项的索引
             columns、读取数组生成选择器列表    -->
          <div class="box">
            <van-button type="primary" block @click="onConfirm2"
              >取消</van-button
            >
            <!-- 取消按钮、关闭此项选择器按钮 -->
            <van-button color="#1cb676" @click="okFn2" type="primary" block
              >确认
              <!-- 确认按钮、确认后刷新并关闭选择器 -->
            </van-button>
          </div>
        </van-dropdown-item>
        <!-- 方式子菜单 -->

        <!-- 租金子菜单 -->
        <van-dropdown-item title="租金" ref="item3">
          <!-- ref、绑定元素、用于关闭此项下拉菜单、每个菜单都需要单独绑定点击事件 -->
          <van-picker
            ref="val3"
            :default-index="1"
            :columns="allInfo.price"
            @change="onPrice"
          />
          <!-- ↑↑↑ ref、绑定选择器、用于获取选择器当前选择的数据、每个选择器使用不同的ref
          default-index、默认选中项的索引
             columns、读取数组生成选择器列表    -->
          <div class="box">
            <van-button type="primary" block @click="onConfirm3"
              >取消
              <!-- 取消按钮、关闭此项选择器按钮 -->
            </van-button>
            <van-button color="#1cb676" @click="okFn3" type="primary" block
              >确认
              <!-- 确认按钮、确认后刷新并关闭选择器 -->
            </van-button>
          </div>
        </van-dropdown-item>
        <!-- 租金子菜单 -->

        <!-- 侧边栏菜单 -->
        <van-dropdown-item title="筛选" @open="show = true" ref="item4">
          <!-- 绑定点击事件、用于打开侧边栏菜单 -->
        </van-dropdown-item>
        <!-- 侧边栏菜单 -->
      </van-dropdown-menu>
      <!-- 下拉菜单结束 -->
    </van-sticky>
    <div class="sky" v-if="skyShow">
      <van-image src="http://liufusong.top:8080/img/not-found.png" />
      <p>暂无房源</p>
    </div>
    <div v-else class="cardlist">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <Card
          v-for="(obj, index) in houseList"
          :key="index"
          :houseData="obj"
        ></Card>
      </van-list>
    </div>

    <van-popup
      close-icon="close"
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '80%' }"
    >
      <Popup :menuData="allInfo" @submit="submit"></Popup
    ></van-popup>
    <van-dialog
      v-model="dialogShow"
      width="100px"
      :show-confirm-button="false"
    >
      <template #title>
        <van-loading type="spinner" color="#1989fa" />
        加载中
      </template>
    </van-dialog>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import Popup from './components/Popup.vue'
import { getHouseInfo, getHouseList } from '@/api/houseList'
export default {
  created () {
    this.getHouseInfo()
  },
  data () {
    return {
      dialogShow: false,
      loading: false,
      finished: false,
      skyShow: false,
      menuData: [],
      show: false,
      value: '',
      active: 0,
      allInfo: {}, // 全部数
      houseList: [], // 房屋列表数据
      dataObj: {
        cityId: this.$store.state.nowAddress.value, // ---当前城市的id、在vuex中获取
        start: 1, // 服务器返回房源起始数据、---类似分页功能
        end: 20// 服务器返回房源起始数据
      }// 初始表单数据、用于提交到服务器获取筛选后的房源列表
    }
  },
  methods: {
    onLoad () {
      // 懒加载事件、滑动后数据起始增加、数据结束增加
      this.dataObj.start += 20
      this.dataObj.end += 20
      // 申请新的数据
      this.getHouseList()
    },
    // 侧边栏弹出菜单--子传父触发事件
    submit (obj) {
      this.show = false
      // console.log(obj)
      // console.log(this.dataObj)
      // 更新数据
      this.houseList = []
      this.dataObj.start = 1
      this.dataObj.end = 20
      this.dataObj.more = obj.join()
      // 提交请求获取新的房源
      this.getHouseList()
    },
    // 下拉菜单1的确认按钮触发函数
    okFn1 () {
      this.onConfirm1()
      // console.log(1)
      this.houseList = []
      this.dataObj.start = 1
      this.dataObj.end = 20
      this.getHouseList()
    },
    // 下拉菜单2的确认按钮触发函数
    okFn2 () {
      this.onConfirm2()
      // console.log(2)
      this.houseList = []
      this.dataObj.start = 1
      this.dataObj.end = 20
      this.getHouseList()
    },
    // 下拉菜单3的确认按钮触发函数
    okFn3 () {
      this.onConfirm3()
      // console.log(3)
      this.houseList = []
      this.dataObj.start = 1
      this.dataObj.end = 20
      this.getHouseList()
    },
    onConfirm1 () { // 第一个下拉菜单的关闭事件---利用$refs、控制关闭
      this.$refs.item1.toggle()
    },
    onConfirm2 () { // 第一个下拉菜单的关闭事件---利用$refs、控制关闭
      this.$refs.item2.toggle()
    },
    onConfirm3 () { // 第一个下拉菜单的关闭事件---利用$refs、控制关闭
      this.$refs.item3.toggle()
    },

    // 过滤地区下拉菜单的中得到的数据、获取有效的一项数据----由该下拉菜单的@change事件触发
    onArea () {
      const value = this.$refs.val1.getValues()
      console.log(value)
      // console.log(value[0].value)
      let area = null
      if (value[0].value !== 'area') {
        delete this.dataObj.area
        area = 'subway'
      } else {
        delete this.dataObj.subway
        area = 'area'
      }
      if (value[1].value !== 'null') {
        if (value[2].value === 'null') {
          // console.log(value[1].text)
          this.dataObj[area] = value[1].value
        } else {
          console.log(value[2].text)
          this.dataObj[area] = value[2].value
        }
      }
    },
    // 过滤方式中获取到的数据----由该下拉菜单的@change事件触发
    onMode () {
      const value = this.$refs.val2.getValues()
      delete this.dataObj.rentType
      // console.log(value)
      if (value[0].value !== 'null') {
        console.log(value[0].value)
        this.dataObj.rentType = value[0].value
      }
    },

    // 过滤租金中获取到的数据----由该下拉菜单的@change事件触发
    onPrice () {
      const value = this.$refs.val3.getValues()
      delete this.dataObj.price
      // console.log(value)
      if (value[0].value !== 'null') {
        console.log(value[0].value)
        this.dataObj.price = value[0].value
      }
    },
    // navbar搜索事件----无效事件
    onSearch () { },

    // 获取筛选房屋列表数据
    async getHouseList () {
      // 触发对应的懒加载事件
      this.loading = true
      this.finished = false
      try {
        const res = await getHouseList(this.dataObj)
        this.houseList.push(...res.data.body.list)
        console.log(res)
        this.skyShow = false
        // 判断是否还有新数据、如果没有就反馈没有新数据
        if (res.data.body.list.length < 1) {
          this.finished = true
          this.skyShow = true
        }
        this.loading = false
      } catch (error) {
        this.finished = true
        console.log(error)
      }
    },

    // 获取房屋筛选条件
    async getHouseInfo () {
      try {
        this.dialogShow = true
        const res = await getHouseInfo()
        // 处理获取到的数据、为了适配选择器的数据结构
        const josn = JSON.stringify(res.data.body).replace(/label/g, 'text').replace(/"null"/g, '"null","children":[""]')
        // 把数据转换为 JSON 类型、josn数据为字符串、可以用 replace方法、把label替换为text----null为补全空数据、防止显示错误
        this.allInfo = JSON.parse(josn) // 将处理后的数据还原为对象数据、并且存放到data中使用
        // this.$store.commit('addDatas', this.allInfo)
        // console.log(this.allInfo)
        this.dialogShow = false
      } catch (error) {
        console.log(error)
        this.dialogShow = false
      }
    }
  },
  computed: {
    areaList () { // 区域下拉菜单数据
      // 拼接区域和地铁的数据、第一个下拉菜单有两组数据、故需要拼接
      const data = [this.allInfo.area, this.allInfo.subway]
      return data
    }
  },
  watch: {},
  filters: {},
  components: { Popup, Card }
}
</script>

<style scoped lang='less'>
.sky {
  text-align: center;
  .van-image {
    width: 150px;
    margin: 50px auto 10px;
  }
  p {
    font-size: 14px;
    color: #333;
  }
}
.cardlist {
  overflow: hidden;
  padding-bottom: 50px;
  //   overflow: auto;
  //   height: calc(100vh - 100px);
}
.van-dropdown-item {
  .box {
    display: flex;
    border-top: 1px solid #e9e9e9;
    .van-button:nth-child(1) {
      flex: 1;
    }
    .van-button:nth-child(2) {
      flex: 2;
    }
  }
}
/deep/ .van-dropdown-menu__title--active {
  color: #1cb576;
}
/deep/.van-nav-bar__title {
  max-width: 100%;
}
.van-search {
  margin-left: 25px;
  width: 335px;
  .van-button {
    font-size: 14px;
    transform: translateY(-5px);
  }
}
.van-search__label {
  height: 16px;
  margin: 0;
  margin-top: 8px;
  padding: 0;
  padding-right: 10px;
  border-right: 1px solid #e5e5e5;
  margin-right: 10px;
  line-height: 16px;
}
/deep/.van-cell {
  i {
    color: #9c9fa1 !important;
  }
}
/deep/.van-dropdown-menu__bar {
  height: 40px !important;
}
</style>
