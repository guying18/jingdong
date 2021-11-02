<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png"
         class="wrapper__img" />
    <div class="wrapper__input">
      <input type="text"
             class="wrapper__input__content"
             placeholder="请输入用户名" />
    </div>
    <div class="wrapper__input">
      <input type="password"
             class="wrapper__input__content"
             autocomplete="new-password"
             placeholder="请输入密码" />
    </div>
    <div class="wrapper__input">
      <input type="password"
             class="wrapper__input__content"
             placeholder="确认密码" />
    </div>
    <div class="wrapper__register-button"
         @click="handleRegister">注册</div>
    <div class="wrapper__register-link"
         @click="handleToLoginClick">
      已有账号去登陆
    </div>
    <Toast v-if="show"
           :message="toastMessage" />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '@/utils/request.js'
import Toast, { useToastEffect } from '@/components/Toast.vue'
// 处理注册逻辑
const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: '',
    ensurment: ''
  })
  const handleRegister = async () => {
    try {
      const result = await post('/api/user/register', {
        username: data.username,
        password: data.password
      })
      // console.log(result)
      if (result.errno === 0) {
        router.push({ name: 'Login' })
      } else {
        showToast('注册失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password, ensurment } = toRefs(data)
  return { username, password, ensurment, handleRegister }
}
// 处理切换到登录页面逻辑
const useToLoginEffect = () => {
  const router = useRouter()
  const handleToLoginClick = () => {
    router.push({ name: 'Login' })
  }
  return { handleToLoginClick }
}

export default {
  name: 'Register',
  components: {
    Toast
  },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, ensurment, handleRegister } = useRegisterEffect(showToast)
    const { handleToLoginClick } = useToLoginEffect()

    return {
      username,
      password,
      ensurment,
      handleRegister,
      handleToLoginClick,
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
      line-height: 0.22rem;
      width: 100%;
      font-size: 0.16rem;
      color: $content-notice-fontcolor;
    }
    &::placeholder {
      color: $content-notice-fontcolor;
    }
  }
  &__register-button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    background: $btn-bgColor;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    color: $bg-color;
    font-size: 0.16rem;
    text-align: center;
  }
  &__register-link {
    font-size: 0.14rem;
    text-align: center;
    color: $content-notice-fontcolor;
  }
}
</style>
