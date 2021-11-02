import { useStore } from 'vuex'
import { computed } from 'vue'

// 处理购物车相关逻辑
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', { shopId, productId, productInfo, num })
  }
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    const notEmptyProductList = {}
    for (const i in productList) {
      const product = productList[i]
      if (product.count > 0) {
        notEmptyProductList[i] = product
      }
    }
    return notEmptyProductList
  })

  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })

  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList
    const result = { total: 0, totalPrice: 0, allChecked: true }
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        result.total += product.count
        if (product.check) {
          result.totalPrice += (product.count * product.price)
        }
        if (product.count > 0 && !product.check) {
          result.allChecked = false
        }
      }
    }
    result.totalPrice = result.totalPrice.toFixed(2)
    return result
  })
  return { cartList, shopName, productList, calculations, changeCartItemInfo, getProductCartCount }
}
