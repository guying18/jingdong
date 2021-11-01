<template>
  <div class="wrapper">
    <TopArea />
    <ProductList />
    <Order />
  </div>
</template>

<script>
import TopArea from '@/views/orderConfirmation/TopArea.vue'
import ProductList from '@/views/orderConfirmation/ProductList.vue'
import Order from '@/views/orderConfirmation/Order.vue'

export default {
  name: 'OrderConfirmation',
  components: { TopArea, ProductList, Order }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";
.wrapper {
  // overflow-y: scroll;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $search-bgColor;
}
</style>
