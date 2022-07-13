<template>
  <div>
    <van-nav-bar
      title="发布房源"
      left-arrow
      placeholder
      @click-left="$router.back()"
    />
    <div class="top">房源信息</div>
    <van-cell-group>
      <van-cell
        title="小区名称"
        :value="text.area ? text.area : '请输入小区名称'"
        is-link
        @click="titleShow = true"
      />
      <van-field
        v-model="allData.price"
        type="digit"
        :label="'租\xa0\xa0\xa0\xa0\xa0\xa0\xa0金'"
        placeholder="请输入租金/月"
      >
        <template #right-icon> ¥/月 </template>
      </van-field>
      <van-field
        type="digit"
        v-model="allData.size"
        label="建筑面积"
        right-icon="warning-o"
        placeholder="请输入建筑面积"
      >
        <template #right-icon>m²</template>
      </van-field>
      <van-cell
        :title="'户\xa0\xa0\xa0\xa0\xa0\xa0\xa0型'"
        :value="text.roomType ? text.roomType : '请选择'"
        is-link
        @click="onRoomType(1)"
      />
      <van-cell
        title="所在楼层"
        :value="text.floor ? text.floor : '请选择'"
        is-link
        @click="onFloor(2)"
      />
      <van-cell
        :title="'朝\xa0\xa0\xa0\xa0\xa0\xa0\xa0向'"
        :value="text.oriented ? text.oriented : '请选择'"
        is-link
        @click="onOriented(3)"
      />
    </van-cell-group>
    <div class="button">房屋标题</div>
    <van-field
      v-model="allData.title"
      placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
    />
    <div class="button">房屋图像</div>
    <van-uploader v-model="fileList" multiple :after-read="afterRead" />
    <div class="button">房屋配置</div>
    <van-grid :column-num="5">
      <van-grid-item
        v-for="(obj, index) in params.supporting"
        :class="{ red: supportingList.some((v) => v == obj.text) }"
        :key="index"
        icon="photo-o"
        @click="supporting(obj.text)"
      >
        <template #text>
          <span
            style="font-size: 14px"
            :class="{ red: supportingList.some((v) => v == obj.text) }"
            >{{ obj.text }}</span
          >
        </template>
      </van-grid-item>
    </van-grid>
    <div class="button">房屋描述</div>
    <van-field
      v-model="allData.description"
      rows="2"
      :autosize="{ maxHeight: 150, minHeight: 100 }"
      type="textarea"
      placeholder="请输入房屋描述信息"
      show-word-limit
    />

    <div class="btnbox">
      <van-button block type="default" @click="clearFn">取消</van-button
      ><van-button type="default" block color="#1cb676" @click="upHouse"
        >提交</van-button
      >
    </div>
    <van-popup
      v-model="titleShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <form action="/" v-if="titleShow">
        <van-search
          v-model="value"
          autofocus
          show-action
          placeholder="请输入搜索关键词"
          @input="onSearch"
          @cancel="onCancel"
        />
      </form>
      <div class="arealist">
        <van-cell
          :title="obj.communityName"
          v-for="(obj, ind) in arealist"
          :key="ind"
          @click="areaFn(obj)"
        />
      </div>
    </van-popup>
    <van-popup v-model="pigShow" position="bottom" :style="{ height: '45%' }">
      <van-picker
        show-toolbar
        :columns="data"
        ref="pig"
        @cancel="onpigShow"
        @confirm="onpig"
      />
    </van-popup>
  </div>
</template>

<script>
import { getCommunity, getParams, upImg, upHouse } from '@/api/houseNew'
import { Toast, Dialog } from 'vant'
let timer = null
export default {
  created () {
    this.getParams()
  },
  data () {
    return {
      imgs: [],
      fileList: [],
      supportingList: [],
      index: 0,
      value: '',
      titleShow: false,
      pigShow: false,
      allData: {},
      text: {},
      arealist: [],
      params: {},
      data: []
    }
  },
  methods: {
    clearFn () {
      Dialog.confirm({
        title: '提示',
        message: '是否取消发布？如果确认将清除所有内容'
      })
        .then(() => {
          this.$router.back()
        })
        .catch(() => {
          // on cancel
        })
    },
    async upHouse () {
      try {
        this.allData.houseImg = this.imgs.join('|')
        this.allData.supporting = this.supportingList.join('|')
        const res = await upHouse(this.allData)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    supporting (name) {
      if (this.supportingList.some(v => v === name)) {
        const index = this.supportingList.indexOf(name)
        this.supportingList.splice(index, 1)
      } else {
        this.supportingList.push(name)
      }
    },
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      const formdata = new FormData()
      formdata.append('file', file.file)
      const res = await upImg(formdata)
      console.log(res)
      this.imgs.push(res.data.body)
    },
    onpigShow () {
      this.pigShow = false
    },
    onpig () {
      const value = this.$refs.pig.getValues() // 9.通过ref标记的组件、用getValues<选择器自带方法>方法获取选中的数据 获取滚动数据值
      console.log(value)
      if (this.index === 1) { // 10. 判断时那一组数据
        this.allData.roomType = value[0].value // 11.在暂存数据中存放对应的数据   滚动数据值的第一项的id   放到新增的.roomType里
        this.text.roomType = value[0].text // 12. 滚动数据值的第一项的值放到.roomType1
      } else if (this.index === 2) {
        this.allData.floor = value[0].value
        this.text.floor = value[0].text
      } else {
        this.allData.oriented = value[0].value
        this.text.oriented = value[0].text
      }
      this.pigShow = false
    },
    onOriented (id) {
      this.data = this.params.oriented
      this.pigShow = true
      this.index = id
    },
    onFloor (id) {
      this.data = this.params.floor
      this.pigShow = true
      this.index = id
    },
    onRoomType (id) {
      this.data = this.params.roomType
      this.pigShow = true
      this.index = id
    },
    async getParams () {
      const res = await getParams()
      const josn = JSON.stringify(res.data.body).replace(/label/g, 'text')
      // 把数据转换为 JSON 类型、josn数据为字符串、可以用 replace方法、把label替换为text----null为补全空数据、防止显示错误
      this.params = JSON.parse(josn)
      console.log(res)
    },
    areaFn (obj) {
      this.allData.community = obj.community
      this.text.area = obj.communityName
      this.titleShow = false
    },
    onSearch (val) {
      clearTimeout(timer)
      timer = setTimeout(async () => {
        try {
          console.log(val)
          const res = await getCommunity(this.value)
          console.log(res)
          this.arealist = res.data.body
        } catch (error) {
          console.log(error)
        }
      }, 300)
    },
    onCancel () {
      this.titleShow = false
      Toast('取消')
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
  display: flex;
  position: fixed;
  width: 100vw;
  bottom: 0;
  .van-button {
    flex: 1;
  }
}
/deep/.red {
  color: red !important;
}

.top {
  padding: 15px;
  color: #21b97a;
  font-size: 15px;
  border-bottom: 1px solid #f9f9fa;
}
.button {
  padding: 15px;
  font-size: 15px;
  color: #333;
  border-bottom: 1px solid #f9f9fa;
}
</style>
