<template>
  <div style="width: 400px">
    <h2>Goal</h2>
    <input type="text" style="width: 100%" v-model="newGoalText" />
    <button id="addGoal" @click="addGoal">Add Goal</button>
    <div v-for="goal of goals" :key="goal">{{ goal }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newGoalText: '',
      goals: []
    }
  },
  methods: {
    addGoal() {
      this.goals.push(this.newGoalText)
      this.newGoalText = ''
    }
  }
}
</script>