import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalCartList = () => {
  // { shopId: { shopName: '', productList: { productId: {} } } }
  return JSON.parse(localStorage.cartList) || {}
}

export default createStore({
  state: {
    cartList: getLocalCartList()
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const {
        shopId, productId, productInfo, num
      } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      let product = shopInfo.productList[productId]
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
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      // console.log(state.cartList)
      setLocalCartList(state)
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    setCartItemsChecked (state, payload) {
      const { shopId, allChecked } = payload
      const productList = state.cartList[shopId].productList
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
      setLocalCartList(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
