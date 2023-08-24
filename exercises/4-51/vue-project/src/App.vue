<template>
  <div style="width: 600px">
    <h1>Monster Slayer</h1>
    <div>
      <h2>Monster Health</h2>
      <div class="healthGauge">
        <div class="health" :style="{ width: monsterHealthSafe + '%' }"></div>
      </div>
    </div>
    <div>
      <h2>Your Health</h2>
      <div class="healthGauge">
        <div class="health" :style="{ width: yourHealthSafe + '%' }"></div>
      </div>
    </div>
    <div v-if="!battleOver">
      <button @click="attack">Attack</button>
      <button @click="specialAttack" :disabled="specialAttackCooldown > 0">Special Attack</button>
      <button @click="heal">Heal</button>
      <button @click="surrender">Surrender</button>
    </div>
    <div v-else>
      <h2>Game Over!</h2>
      <h3 v-if="youWin">You Won!</h3>
      <h3 v-else-if="youLost">You Lost!</h3>
      <h3 v-else>Tie!</h3>
      <button @click="reset">Start New Game</button>
    </div>
    <div>
      <h2>Battle Log</h2>
      <div v-for="log in battleLog" :key="log" v-html="log" />
    </div>
  </div>
</template>

<script>
export default {
  derp: {},
  data() {
    return {
      monsterHealth: 100,
      yourHealth: 100,
      battleLog: [],
      damageLimits: {
        you: { min: 5, max: 12, special: { min: 10, max: 25 } },
        monster: { min: 8, max: 15, special: 20 },
      },
      specialAttackCooldown: 0
    }
  },
  computed: {
    battleOver() {
      return this.monsterHealth <= 0 || this.yourHealth <= 0
    },
    youWin() {
      return this.yourHealth > 0 && this.monsterHealth <= 0
    },
    youLost() {
      return this.yourHealth <= 0 && this.monsterHealth > 0
    },
    yourHealthSafe() {
      return this.yourHealth <= 0 ? 0 : this.yourHealth
    },
    monsterHealthSafe() {
      return this.monsterHealth <= 0 ? 0 : this.monsterHealth
    }
  },
  methods: {
    incrementRound() {
      this.specialAttackCooldown = this.specialAttackCooldown > 0 ? this.specialAttackCooldown - 1 : 0
    },
    getRandomValue(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    },
    attackPlayer() {
      const { min: monsterMin, max: monsterMax } = this.damageLimits.monster
      const attack = this.getRandomValue(monsterMin, monsterMax)
      this.yourHealth -= attack
      this.battleLog.push(`<span style="color: red">Monster</span> attacked <span style="color: green">Player</span> for ${attack}!`)
    },
    attackMonster(min, max) {
      const attack = this.getRandomValue(min, max)
      this.monsterHealth -= attack
      this.battleLog.push(`<span style="color: green">Player</span> attacked <span style="color: red">Monster</span> for ${attack}!`)
      this.attackPlayer()
    },
    attack() {
      const { min: youMin, max: youMax } = this.damageLimits.you
      this.attackMonster(youMin, youMax)
      this.incrementRound()
    },
    specialAttack() {
      const { min: youMin, max: youMax } = this.damageLimits.you.special
      this.attackMonster(youMin, youMax)
      this.incrementRound()
      this.specialAttackCooldown = 3
    },
    heal() {
      const healAmount = this.getRandomValue(8, 20)
      this.yourHealth += healAmount
      this.battleLog.push(`<span style="color: green">Player</span> healed for ${healAmount}!`)
      if(this.yourHealth > 100) this.yourHealth = 100
      this.attackPlayer()
      this.incrementRound()
    },
    surrender() {
      this.yourHealth = 0
    },
    reset() {
      this.monsterHealth = 100
      this.yourHealth = 100
      this.specialAttackCooldown = 0
      this.battleLog = []
    }
  }
}
</script>

<style scoped>
.healthGauge {
  height: 25px;
  width: 100%;
  background-color: red;
}

.health {
  height: 100%;
  background-color: green;
}
</style>