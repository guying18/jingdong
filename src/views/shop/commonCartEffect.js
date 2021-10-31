import { useStore } from 'vuex'

// 处理购物车相关逻辑
export const useCommonCartEffect = () => {
  const store = useStore()
  const cartList = store.state.cartList
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', { shopId, productId, productInfo, num })
  }
  return { cartList, changeCartItemInfo, getProductCartCount }
}
