<template>
  <div>
    <van-nav-bar
      title="账号登录"
      left-arrow
      placeholder
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-field
        size=""
        v-model="username"
        center
        label-align="left"
        name="username"
        placeholder="请输入账号"
        :rules="[
          { required: true, message: '请填写账号' },
          { pattern: /(?=.*\d).+$/g, message: '用户名格式5-8位之间' },
        ]"
      />
      <van-field
        v-model="password"
        center
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登 录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { LoginAPI } from '@/api/login.js'

export default {
  created () { },
  data () {
    return {
      username: '654321',
      password: 'ma123456'
    }
  },
  methods: {
    onClose () {
      console.log(1)
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    async onSubmit (values) {
      // console.log(values)
      try {
        const res = await LoginAPI(values)
        console.log(res)
        if (res.data.status !== 200) {
          return this.$toast.fail(res.data.description)
        }
        this.addToken(res.data.body.token)
        this.$toast.success('登录成功')
        this.$router.push({ path: '/home' })
      } catch (e) {
        this.$toast.fail('登录异常')
      }
    },
    ...mapMutations(['addToken'])
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
// .van-form{
// margin: 20px;
// }
.van-form {
  margin-top: 22px;
  .van-field {
    width: 345px;
    font-size: 18px;
    height: 62px;
    line-height: 19px;
    border-bottom: 1px solid rgb(231, 231, 231);
    margin: 5px 15px;
    padding: 4px 0px;
  }
  .van-button {
    margin-top: 25px;
    height: 50px;
    font-size: 18px;
  }
}
</style>
