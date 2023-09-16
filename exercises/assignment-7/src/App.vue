<template>
  <div>
    <Solution4 />
  </div>
</template>

<script>
import Solution4 from './components/Solution4.vue'
export default {
  components: {
    Solution4
  }
}

// 1. output main course goal I have (h3 tag, put the data in the composition data API)
// 2. manage more data and react to an event (add a button that'll toggle the visibilty of the h3 button)
// 3. change all data to be managed as separate refs, then a single ref object, then as a reactive object
// 4. solve the assignment with the options API
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
