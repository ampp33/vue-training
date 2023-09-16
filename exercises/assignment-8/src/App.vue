<template>
  <div>
    <h1>Expense Tracker</h1>
    <div>Available Funds: {{ startingAmount }}</div>
    <div>Total Expenses: {{ totalExpenses }}</div>
    <div>Remainging Funds: {{ remainingAmount }}</div>
    <div>
      <label for="newPurchase">Amount: </label>
      <input id="newPurchase" type="number" v-model="newPurchase" />
    </div>
    <button @click="addPurchase">Add Expense</button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const startingAmount = 100
const newPurchase = ref(0)
const purchases = ref([])

const addPurchase = () => {
  purchases.value.push(newPurchase.value)
  newPurchase.value = 0
}

const totalExpenses = computed(() => purchases.value.reduce((acc, curr) => acc + curr, 0))
const remainingAmount = computed(() => startingAmount - totalExpenses.value)
watch(remainingAmount, (amount) => {
  if(amount < 0) alert('you fucked up, you\'re broke')
})
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
