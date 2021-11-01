<template>
  <div class="product">
    <div class="product__title">
      {{shopName}}
    </div>
    <div class="product__list">
      <div v-for="item in productList"
           :key="item._id"
           class="product__item">
        <img :src="item.imgUrl"
             alt=""
             class="product__item__img">
        <div class="product__item__details">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__price">
            <span>
              <span class="product__item__yen">&yen;</span>
              {{item.price}} x {{item.count}}
            </span>
            <span class="product__item__total">
              <span class="product__item__yen">&yen;</span>
              {{(item.price * item.count).toFixed(2)}}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '@/effects/CartEffects.js'

export default {
  name: 'ProductList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { shopName, productList } = useCommonCartEffect(shopId)
    // console.log(productList)
    return { shopName, productList }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";
.product {
  // overflow-y: scroll;
  position: relative;
  height: 3rem;
  margin: 0.16rem 0.18rem 0.2rem 0.18rem;
  background: $bg-color;
  border-radius: 0.04rem;
  &__title {
    padding: 0.16rem 0.16rem 0 0.16rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
  }
  &__list {
    overflow-y: scroll;
    position: absolute;
    left: 0;
    right: 0;
    top: 0.38rem;
    bottom: 0;
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.16rem;
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__details {
      flex: 1;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      display: flex;
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
    }
    &__total {
      flex: 1;
      text-align: right;
      color: $dark-fontcolor;
    }
    &__yen {
      font-size: 0.12rem;
    }
  }
}
</style>
