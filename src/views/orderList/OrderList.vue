<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order"
           v-for="(item, index) in list"
           :key="index">
        <div class="order__title">
          {{item.shopName}}
          <span class="order__status">{{item.isCanceled? '已取消': '已下单'}}</span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template v-for="(innerItem, innerIndex) in item.products"
                      :key="innerIndex">
              <img :src="innerItem.product.img"
                   alt=""
                   class="order__content__img"
                   v-if="innerIndex <= 3">
            </template>

          </div>
          <div class="order__content__info">
            <div class="order__content__price">&yen;{{item.totalPrice}}</div>
            <div class="order__content__count">共{{item.totalCount}}件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { get } from '@/utils/request.js'
import Docker from '@/components/Docker.vue'

// 处理订单列表逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getNearbyList = async () => {
    const result = await get('api/order')
    // console.log(result)
    if (result.errno === 0 && result.data.length) {
      const OrderList = result.data
      OrderList.forEach(order => {
        const products = order.products || []
        let totalCount = 0
        let totalPrice = 0
        products.forEach(productItem => {
          totalCount += (productItem?.orderSales || 0)
          totalPrice += (productItem?.orderSales * productItem?.product?.price || 0)
        })
        order.totalCount = totalCount
        order.totalPrice = totalPrice
      })
      data.list = result.data
    }
  }
  getNearbyList()
  const { list } = toRefs(data)
  return { list, getNearbyList }
}

export default {
  name: 'OrderList',
  components: {
    Docker
  },
  setup () {
    const { list } = useOrderListEffect()
    // console.log(list)
    return { list }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  background: $search-bgColor;
}
.title {
  line-height: 0.44rem;
  text-align: center;
  font-size: 0.16rem;
  color: $content-fontcolor;
  background: $bg-color;
}
.order {
  margin: 0.16rem 0.18rem;
  padding: 0.16rem;
  background: $bg-color;
  &__title {
    margin-bottom: 0.16rem;
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
  }
  &__status {
    float: right;
    font-size: 0.14rem;
    color: $light-fontColor;
  }
  &__content {
    display: flex;
    &__imgs {
      flex: 1;
    }
    &__img {
      margin-right: 0.12rem;
      width: 0.4rem;
      height: 0.4rem;
    }
    &__info {
      width: 0.7rem;
    }
    &__price {
      margin-bottom: 0.04rem;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
      text-align: right;
    }
    &__count {
      line-height: 0.14rem;
      font-size: 0.12rem;
      color: $content-fontcolor;
      text-align: right;
    }
  }
}
</style>
