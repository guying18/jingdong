<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png"
         class="wrapper__img" />
    <div class="wrapper__input">
      <input type="text"
             class="wrapper__input__content"
             v-model="username"
             placeholder="请输入手机号" />
    </div>
    <div class="wrapper__input">
      <input type="password"
             class="wrapper__input__content"
             v-model="password"
             autocomplete="new-password"
             placeholder="请输入密码" />
    </div>
    <div class="wrapper__login-button"
         @click="handleLogin">登录</div>
    <div class="wrapper__login-link"
         @click="handleToRegisterClick">立即注册</div>
  </div>
  <Toast v-if="show"
         :message="toastMessage" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '@/utils/request.js'
import Toast, { useToastEffect } from '@/components/Toast.vue'
// 处理登录逻辑
const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: ''
  })
  const handleLogin = async () => {
    const { username, password } = data
    if (username !== '' && password !== '') {
      try {
        const result = await post('/api/user/login', {
          username: username,
          password: password
        })
        // console.log(result)
        if (result.errno === 0) {
          localStorage.isLogin = true
          router.push({ name: 'Home' })
        } else {
          showToast('登录失败')
        }
      } catch (e) {
        showToast('请求失败')
      }
    } else {
      showToast('用户名和密码不能为空')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}
// 处理切换到注册逻辑
const useToRegisterEffect = () => {
  const router = useRouter()
  const handleToRegisterClick = () => {
    router.push({ name: 'Register' })
  }
  return { handleToRegisterClick }
}

export default {
  name: 'Login',
  components: {
    Toast
  },
  // setup 函数职责就是告诉你，代码执行的流程
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleToRegisterClick } = useToRegisterEffect()

    return {
      username,
      password,
      handleLogin,
      handleToRegisterClick,
      show,
      toastMessage
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.66rem;
    height: 0.66rem;
  }
  &__input {
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    background: #f9f9f9;
    border: 0.01rem solid rgba($color: #000, $alpha: 0.1);
    border-radius: 0.06rem;
    &__content {
      margin-top: 0.12rem;
      border: none;
      outline: none;
      background: none;
      line-height: 0rem;
      width: 100%;
      font-size: 0.16rem;
      color: $content-notice-fontcolor;
    }
    &::placeholder {
      color: $content-notice-fontcolor;
    }
  }
  &__login-button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    background: $btn-bgColor;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    color: $bg-color;
    font-size: 0.16rem;
    text-align: center;
  }
  &__login-link {
    font-size: 0.14rem;
    text-align: center;
    color: $content-notice-fontcolor;
  }
}
</style>
