<template>
    <h2>My Course Goal</h2>
    <h3 v-if="displayGoal">{{ goal }}</h3>
    <button @click="toggleDisplayGoal">Toggle Goal</button>
</template>
  
<script>
export default {
    data() {
        return {
            goal: 'Goal text here!',
            displayGoal: false,
        }
    },
    methods: {
        toggleDisplayGoal() {
            this.displayGoal = !this.displayGoal
        }
    }
}
</script>