<template>
  <div class="mask"
       v-if="showCart"></div>
  <div class="cart">
    <div class="product"
         v-if="showCart">
      <div class="product__header">
        <div class="product__header__all"
             @click="() => setCartItemsChecked(shopId,allChecked)">
          <span class="product__header__icon iconfont"
                v-html="allChecked? '&#xe656;' :'&#xe64f;'">
          </span>
          全选
        </div>
        <div class="product__header__clear"
             @click="() => cleanCartProducts(shopId)">清空购物车</div>
      </div>
      <template v-for="item in productList"
                :key="item._id">
        <div class="product__item"
             v-if="item.count > 0">
          <div class="product__item__checked iconfont"
               v-html="item.check? '&#xe656;' :'&#xe64f;'"
               @click="() => changeCartItemChecked(shopId, item._id)"></div>
          <img :src="item.imgUrl"
               alt=""
               class="product__item__img">
          <div class="product__item__details">
            <h4 class="product__item__title">{{item.name}}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{item.price}}
              <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
            </p>
          </div>
          <div class="product__number">
            <span class="product__number__minus"
                  @click="() => { changeCartItemInfo(shopId, item._id, item, -1)}">-</span>
            {{cartList?.[shopId]?.[item._id].count || 0}}
            <span class="product__number__plus"
                  @click="() => { changeCartItemInfo(shopId, item._id, item, 1)}">+</span>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png"
             alt=""
             class="check__icon__img"
             @click="handleCartShowChange">
        <div class="check__icon__tag">{{total}}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; {{price}}</span>
      </div>
      <div class="check__btn">去结算</div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { useCommonCartEffect } from '@/views/shop/commonCartEffect.js'

// 底部购物车相关逻辑
const useCartEffect = () => {
  const { cartList, changeCartItemInfo } = useCommonCartEffect()
  const store = useStore()
  const route = useRoute()
  const shopId = route.params.id
  const total = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        count += product.count
      }
    }
    return count
  })
  const price = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.check) {
          count += (product.count * product.price)
        }
      }
    }
    return count.toFixed(2)
  })
  const allChecked = computed(() => {
    const productList = cartList[shopId]
    let result = true
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.count > 0 && !product.check) {
          result = false
        }
      }
    }
    return result
  })
  const productList = computed(() => {
    const productList = cartList[shopId] || []
    return productList
  })
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }
  const setCartItemsChecked = (shopId, allChecked) => {
    store.commit('setCartItemsChecked', { shopId, allChecked })
  }
  return {
    allChecked,
    cartList,
    total,
    price,
    shopId,
    productList,
    changeCartItemInfo,
    cleanCartProducts,
    changeCartItemChecked,
    setCartItemsChecked
  }
}

export default {
  name: 'Cart',
  setup () {
    const showCart = ref(false)
    const handleCartShowChange = () => {
      showCart.value = !showCart.value
    }
    const {
      total, price, shopId, productList, cartList, allChecked,
      cleanCartProducts, changeCartItemInfo, changeCartItemChecked, setCartItemsChecked
    } = useCartEffect()
    return {
      showCart,
      handleCartShowChange,
      cartList,
      total,
      price,
      productList,
      shopId,
      allChecked,
      cleanCartProducts,
      changeCartItemInfo,
      changeCartItemChecked,
      setCartItemsChecked
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.cart {
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 0;
  background: $bg-color;
}
.product {
  overflow-y: scroll;
  flex: 1;
  background: $bg-color;
  &__header {
    display: flex;
    line-height: 0.52rem;
    font-size: 0.14rem;
    border-bottom: 0.01rem solid $content-bgcolor;
    &__all {
      width: 0.64rem;
      margin-left: 0.18rem;
    }
    &__icon {
      display: inline-block;
      width: 0.19rem;
      height: 0.19rem;
      color: $btn-bgColor;
      font-size: 0.2rem;
    }
    &__clear {
      flex: 1;
      margin-right: 0.18rem;
      text-align: right;
      color: $content-fontcolor;
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgcolor;
    &__checked {
      width: 0.19rem;
      height: 0.19rem;
      color: $btn-bgColor;
      font-size: 0.2rem;
      line-height: 0.5rem;
      margin-right: 0.16rem;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__details {
      overflow: hidden;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.12rem;
      &__minus,
      &__plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.16rem;
        border-radius: 50%;
        font-size: 0.2rem;
        text-align: center;
      }
      &__minus {
        border: 0.01rem solid $medium-fontColor;
        color: $medium-fontColor;
        margin-right: 0.1rem;
      }
      &__plus {
        background: $btn-bgColor;
        color: $bg-color;
        margin-left: 0.1rem;
      }
      &__num {
        width: 0.17rem;
        height: 0.16rem;
        font-size: 0.14rem;
        color: $content-fontcolor;
      }
    }
  }
}
.check {
  display: flex;
  box-sizing: border-box;
  height: 0.5rem;
  border-top: 0.01rem solid $content-bgcolor;
  line-height: 0.5rem;
  &__icon {
    position: relative;
    width: 0.84rem;
    &__img {
      display: block;
      margin: 0.12rem auto;
      width: 0.28rem;
      height: 0.26rem;
    }
    &__tag {
      position: absolute;
      left: 0.46rem;
      top: 0.04rem;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      background-color: $hightlight-fontColor;
      border-radius: 0.1rem;
      font-size: 0.16rem;
      text-align: center;
      color: $bg-color;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    color: $content-fontcolor;
    font-size: 0.12rem;
    &__price {
      color: $hightlight-fontColor;
      font-size: 0.18rem;
    }
  }
  &__btn {
    width: 0.98rem;
    background-color: #4fb0f9;
    text-align: center;
    color: $bg-color;
    font-size: 0.14rem;
  }
}
</style>
