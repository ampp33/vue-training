import { createApp } from 'vue';
import { createStore } from 'vuex'

import router from './router.js';
import App from './App.vue';
import BaseBadge from './components/ui/BaseBadge.vue';

const app = createApp(App)

app.use(router);

app.component('base-badge', BaseBadge);

// migrate login and cart to vuex
const store = createStore({
    state() {
        return {
            isLoggedIn: false,
            cart: []
        }
    },
    mutations: {
        addItemToCart(currentState, item) {
            const itemIndex = currentState.cart.findIndex((i) => i.id = item.id)
            if(itemIndex == -1) currentState.cart.push({ ...item })
            else currentState.cart[itemIndex].qty++
        },
        removeItemFromCart(currentState, itemId) {
            const itemIndex = currentState.cart.findIndex((i) => i.id = itemId)
            if(itemIndex == -1) currentState.cart.splice(itemIndex, 1)
        },
        setLoggedIn(currentState, isLoggedIn) {
            currentState.isLoggedIn = isLoggedIn
        }
    },
    actions: {
        addItemToCart(context, item) {
            context.commit('addItemToCart', item)
        },
        removeItemFromCart(context, itemId) {
            context.commit('removeItemFromCart', itemId)
        },
        login(context) {
            context.commit('setLoggedIn', true)
        },
        logout(context) {
            context.commit('setLoggedIn', false)
        }
    },
    getters: {
        getItemsInCart(state) {
            return state.cart
        },
        isLoggedIn(state) {
            return state.isLoggedIn
        },
        numItemsInCart() {
            
        }
    }
})

app.use(store)

app.mount('#app');
