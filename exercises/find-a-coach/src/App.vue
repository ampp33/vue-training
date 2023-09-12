<template>
  <div>
    <the-header title="Coach Details"></the-header>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import TheHeader from './components/UI/TheHeader.vue';

export default {
  components: {
    TheHeader    
  }
}
</script>

<style>
body {
  margin: 0px;

  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.content {
  margin: auto;
  width: 50%;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease-out;
}
</style>
