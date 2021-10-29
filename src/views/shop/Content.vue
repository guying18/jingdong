<template>
  <div class="content">
    <div class="category">
      <div :class="{'category__item': true, 'category__item--active':currentTab === item.tab}"
           v-for="item in categories"
           :key="item.name"
           @click="() => handleTabClick(item.tab)">{{item.name}}</div>
    </div>
    <div class="product">
      <div class="product__item"
           v-for="item in list"
           :key="item._id">
        <img :src="item.imgUrl"
             alt=""
             class="product__item__img">
        <div class="product__item__details">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月售{{item.sales}}件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{item.price}}
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus"
                @click="() => { changeCartItemInfo(shopId, item._id, item, -1)}">-</span>
          {{cartList?.[shopId]?.[item._id]?.count || 0}}
          <span class="product__number__plus"
                @click="() => { changeCartItemInfo(shopId, item._id, item, 1)}">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { get } from '@/utils/request.js'
import { useCommonCartEffect } from '@/views/shop/commonCartEffect.js'

const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }]

// Tab 切换相关逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 获取列表内容相关逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] })
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, { tab: currentTab.value })
    if (result.errno === 0 && result.data.length) {
      content.list = result.data
    }
  }
  watchEffect(() => {
    getContentData()
  })
  const { list } = toRefs(content)
  return { list }
}

export default {
  name: 'content',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCurrentListEffect(currentTab, shopId)
    const { cartList, changeCartItemInfo } = useCommonCartEffect()
    return {
      cartList,
      categories,
      handleTabClick,
      currentTab,
      list,
      shopId,
      changeCartItemInfo
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0.5rem;
  // background: red;
}
.category {
  overflow-y: scroll;
  height: 100%;
  width: 0.76rem;
  background: $search-bgColor;
  &__item {
    line-height: 0.4rem;
    text-align: center;
    font-size: 0.14rem;
    color: $content-fontcolor;
    &--active {
      background: $bg-color;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgcolor;
    &__img {
      width: 0.68rem;
      height: 0.68rem;
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
    &__sales {
      margin: 0.06rem 0;
      font-size: 0.12rem;
      color: $content-fontcolor;
    }
    &__price {
      margin: 0;
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
</style>
