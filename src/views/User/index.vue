<template>
  <div>
    <!-- <van-image
      width="375px"
      height="191px"
      fit="contain"
      src="http://liufusong.top:8080/img/profile/bg.png"
    /> -->
    <div class="topbox">
      <div class="boxmax"></div>
      <div class="box">
        <div class="bg">
          <div class="head">
            <van-image
              v-if="token"
              round
              width="60"
              height="60"
              :src="'http://liufusong.top:8080' + userInfo.avatar"
            />
            <van-image
              v-else
              round
              width="60"
              height="60"
              src="http://liufusong.top:8080/img/profile/avatar.png"
            />
          </div>
          <div class="name">{{ token ? userInfo.nickname : "游客" }}</div>
          <van-button v-if="!token" type="primary" @click="loginFn()">
            去登录</van-button
          >
          <div class="info" v-else>
            <van-button round type="info" @click="loginFn()">退出</van-button>
            <p>编辑个人资料</p>
          </div>
        </div>
      </div>
    </div>
    <van-grid :column-num="3" :border="false">
      <van-grid-item
        icon="star-o"
        text="我的收藏"
        @click="
          $router.push({ path: '/collection', query: { title: '我的收藏' } })
        "
      />
      <van-grid-item
        icon="wap-home-o"
        text="我的出租"
        @click="
          $router.push({ path: '/collection', query: { title: '我的出租' } })
        "
      />
      <van-grid-item icon="clock-o" text="看房记录" />
      <van-grid-item icon="credit-pay" text="成为房主" />
      <van-grid-item icon="user-o" text="个人资料" />
      <van-grid-item icon="service-o" text="联系我们" />
    </van-grid>
    <div class="end"></div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { LogoutAPI } from '@/api/login.js'
import { getUserInfo } from '@/api/user'
import { mapState, mapMutations } from 'vuex'
export default {
  created () {
    this.getUserInfo()
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {

    loginFn () {
      if (this.token) {
        // console.log('登出')
        Dialog.confirm({
          message: '是否确认退出登陆'
        })
          .then(() => {
            // on confirm
            this.logout()
          })
          .catch(() => {
            // on cancel
          })
      } else {
        this.$router.push('/login')
        console.log('登录')
      }
    },
    async getUserInfo () {
      try {
        const res = await getUserInfo()
        if (res.data.status === 200) {
          // console.log(res)
          this.userInfo = res.data.body
        } else if (res.data.description === 'token没有') {
          return
        } else {
          this.$toast.fail('登录失效')
          this.removeToken()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async logout () {
      try {
        const res = await LogoutAPI()
        console.log(res)
        this.removeToken()
        this.userInfo = {}
      } catch (error) {
        console.log(error)
      }
    },
    ...mapMutations(['removeToken'])
  },

  computed: {
    ...mapState(['token'])
  },
  watch: {},
  filters: {},
  components: { [Dialog.Component.name]: Dialog.Component }
}
</script>

<style scoped lang='less'>
.topbox {
  max-height: 375px;
  min-height: 296px;
}
.boxmax {
  width: 375px;
  height: 191px;
  background: url("../../assets/bg.png") no-repeat;
  background-size: contain;
}
.box {
  width: 368px;
  position: absolute;
  top: 85px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  // overflow: hidden;
  .bg {
    margin: 50px auto 0;
    width: 320px;
    height: 165px;
    background-color: #fff;
    box-shadow: 0 0 10px 2px #ddd;
    font-size: 13px;
    text-align: center;

    .head {
      position: absolute;
      top: 15px;
      left: 50%;
      transform: translateX(-50%);
      margin: 0 auto;
      height: 60px;
      width: 60px;
      background-color: #ccc;
      border: 5px solid #fff;
      border-radius: 50px;
      box-shadow: 0 2px 2px 0 #ccc;
    }
    .name {
      padding: 53px 0 20px;
      font-size: 13px;
      color: #333;
    }

    .van-button {
      height: 30px;
      width: 69px;
      font-size: 13px;
      padding: 2px 0 0;
      background-color: #21b97a;
      border-radius: 5px;
      color: #fff;
    }
  }
}
/deep/ .van-grid-item {
  margin: 12px 0 0;
}
/deep/.van-grid-item__content--center {
  .van-icon {
    font-size: 22px;
    color: #333;
  }
  span {
    font-size: 13px;
    color: #333;
  }
}
.end {
  height: 85px;
  width: 345px;
  margin: 16px auto 0;
  // background-color: #ffe46b;
  background: url("../../assets/join.png") no-repeat;
  background-size: contain;
}
</style>
