import { createStore } from 'vuex'

export default createStore({
  state: {
    // 一开始访问时购物车是空的，因此 cartList 是空对象
    cartList: {
      // 第一层级是商铺id
      // shopId: {
      // 第二层是商品id
      // 第二蹭内容是商品内容和购物数量
      //   productId: {
      //     _id: '1',
      //     name: '番茄250g/份',
      //     imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
      //     sales: 10,
      //     price: 33.6,
      //     oldPrice: 39.6,
      //     count: 0
      //   }
      // }

    }
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const {
        shopId, productId, productInfo, num
      } = payload
      let shopInfo = state.cartList[shopId]
      if (!shopInfo) { shopInfo = {} }
      let product = shopInfo[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.count += num
      if (num > 0) { product.check = true }
      if (product.count < 0) {
        product.count = 0
      } else if (product.count > 10) {
        product.count = 10
      }
      shopInfo[productId] = product
      state.cartList[shopId] = shopInfo
      // console.log(shopId, productId, productInfo)
    },
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId][productId]
      product.check = !product.check
    },
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId] = {}
    },
    setCartItemsChecked (state, payload) {
      const { shopId, allChecked } = payload
      const productList = state.cartList[shopId]
      if (productList) {
        for (const i in productList) {
          const product = productList[i]
          if (allChecked) {
            product.check = false
          } else {
            product.check = true
          }
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
