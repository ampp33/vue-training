<template>
  <h2>My Course Goal</h2>
  <h3 v-if="displayGoal">{{ goal }}</h3>
  <button @click="toggleDisplayGoal">Toggle Goal</button>
</template>

<script setup>
import { ref } from 'vue'

const goal = ref('Goal text here!')
const displayGoal = ref(false)
const toggleDisplayGoal = () => { displayGoal.value = !displayGoal.value }
</script>