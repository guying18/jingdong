<template>
  <div class="order">
    <div class="order__price">实付金额 &yen;<b>{{calculations.totalPrice}}</b></div>
    <div class="order__btn"
         @click="() => handleSubmitClick(true)">提交订单</div>
  </div>
  <div class="mask"
       v-show="showConfirm"
       @click="() => handleSubmitClick(false)">
    <div class="mask__content"
         @click.stop>
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div class="mask__content__btn mask__content__btn--first"
             @click="() => handleConfirmOrder(true)">取消订单</div>
        <div class="mask__content__btn mask__content__btn--last"
             @click="() => handleConfirmOrder(false)">确认支付</div>
      </div>
    </div>
  </div>
  <Toast v-if="show"
         :message="toastMessage"
         class="toast" />
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { post } from '@/utils/request.js'
import { useCommonCartEffect } from '@/effects/CartEffects.js'
import Toast, { useToastEffect } from '@/components/Toast.vue'

export default {
  name: 'Order',
  components: {
    Toast
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const shopId = parseInt(route.params.id, 10)
    const showConfirm = ref(false)
    const { shopName, productList, calculations } = useCommonCartEffect(shopId)
    const { show, toastMessage, showToast } = useToastEffect()
    const handleSubmitClick = (state) => {
      showConfirm.value = state
    }

    const handleConfirmOrder = async (isCanceled) => {
      const products = []
      for (const i in productList.value) {
        const product = productList.value[i]
        products.push({ id: parseInt(product._id, 10), num: product.count })
      }
      try {
        const result = await post('/api/order', {
          adderssId: 1,
          shopId,
          shopName: shopName.value,
          isCanceled,
          products
        })
        console.log(result)
        if (result.errno === 0) {
          store.commit('clearCartData', { shopId })
          router.push({ name: 'Home' })
        } else {
          showToast('获取失败')
        }
      } catch (e) {
        showToast('请求失败')
      }
    }
    return { showConfirm, calculations, handleConfirmOrder, handleSubmitClick, show, toastMessage }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.order {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  background: $bg-color;
  &__price {
    flex: 1;
    text-indent: 0.24rem;
    font-size: 0.14rem;
    color: $content-fontcolor;
  }
  &__btn {
    width: 0.98rem;
    background: $btn-bgcolor;
    color: $bg-color;
    font-size: 0.14rem;
    text-align: center;
  }
}
.mask {
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background: $bg-color;
    border-radius: 0.04rem;
    text-align: center;
    &__title {
      margin: 0.24rem 0 0 0;
      line-height: 0.26rem;
      color: $content-fontcolor;
      font-size: 0.18rem;
    }
    &__desc {
      margin: 0.08rem 0 0 0;
      font-size: 0.14rem;
      color: $medium-fontColor;
    }
    &__btns {
      display: flex;
      margin: 0.24rem 0.58rem;
    }
    &__btn {
      flex: 1;
      width: 0.8rem;
      line-height: 0.32rem;
      border-radius: 0.16rem;
      font-size: 0.14rem;
      &--first {
        margin-right: 0.12rem;
        border: 0.01rem solid $btn-bgcolor;
        color: $btn-bgcolor;
      }
      &--last {
        margin-left: 0.12rem;
        background: $btn-bgcolor;
        color: $bg-color;
      }
    }
  }
}
.toast {
  z-index: 100;
}
</style>
