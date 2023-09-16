<template>
    <h2>My Course Goal</h2>
    <h3 v-if="data.displayGoal">{{ data.goal }}</h3>
    <button @click="toggleDisplayGoal">Toggle Goal</button>
</template>
  
<script setup>
import { reactive } from 'vue'

const data = reactive({
    goal: 'Goal text here!',
    displayGoal: false,
})

const toggleDisplayGoal = () => data.displayGoal = !data.displayGoal
</script>