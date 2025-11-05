<template>
  <div class="game-page-container">
    <div class="game-header">
      <div class="time-display">{{ formatTime(gameStore.timeLeft) }}</div>
      <div class="score-display">{{ gameStore.correctAnswers }} ACERTO{{ gameStore.correctAnswers === 1 ? '' : 'S' }}</div>
    </div>

    <div class="pattern-section">
      <p class="instruction">Escolha o item que completa a sequência:</p>
      <div class="pattern-display">
        <template v-for="(item, index) in gameStore.currentPattern" :key="index">
          <div v-if="item === '?'" class="pattern-item question">?</div>
          <div v-else class="pattern-item" :style="{ backgroundColor: item.color }"></div>
        </template>
      </div>
    </div>

    <div class="options-section">
      <p class="options-title">Opções:</p>
      <div class="alternatives-grid">
        <button v-for="(alt, index) in gameStore.alternatives" :key="index" @click="gameStore.checkAnswer(alt)"
          class="shape-option" :style="{ backgroundColor: alt.color }">
        </button>
      </div>
    </div>

    <div class="game-controls">
      <button class="recomecar-button" @click="gameStore.startGame()">RECOMEÇAR</button>
      <RouterLink to="/feedback" class="sair-link">
        <button class="sair-button" @click="gameStore.endGame()">SAIR</button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/gameStore'
import { onMounted, onUnmounted, watch } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const gameStore = useGameStore()
const router = useRouter()

onMounted(() => {
  if (!gameStore.gameStarted && !gameStore.gameEnded) {
    gameStore.startGame()
  }
})

watch(() => gameStore.gameEnded, (val) => {
  if (val) {
    router.push('/feedback')
  }
})

onUnmounted(() => {
  // Limpar timers ou estados ao desmontar, se necessário
})

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.game-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background: radial-gradient(circle at 1px 5px, #faadad4f 150px, transparent 0px), radial-gradient(circle at 100vw 1px, #FFEA9D 20vh, transparent 0px), radial-gradient(circle at 1px 100vh, #AAF1CB5C 20vh, transparent 0px), radial-gradient(circle at 100vw 100vh, #C2DEFF 20vh, transparent 0px);
  font-family: 'Arial', sans-serif;
}

.game-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 350px;
  margin-bottom: 30px;
}

.time-display,
.score-display {
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 1.2em;
  font-weight: bold;
}

.time-display {
  background-color: #E9E9FF; 
  color: #111;
}

.score-display {
  background-color: #ABF2CB; 
  color: #111;
}

.pattern-section {
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  width: 100%;
  max-width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.instruction {
  font-size: 1.1em;
  margin-bottom: 15px;
  color: #333;
  background-color: #f9f9f9;
  padding: 12px;
  border-radius: 8px;
}

.pattern-display {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.pattern-item {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  font-weight: bold;
  color: #555;
  border: 1px solid #ccc;
}

.options-section {
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  width: 100%;
  max-width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.options-title {
  font-size: 1.1em;
  margin-bottom: 15px;
  color: #333;
}

.alternatives-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  justify-items: center;
}

.alternatives-grid button {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: #f9f9f9;
}

.alternatives-grid button:hover {
  border-color: #999;
}

.game-controls {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 350px;
}

.recomecar-button,
.sair-button {
  padding: 12px 25px;
  border-radius: 10px;
  border: none;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #fff;
}

.recomecar-button {
  background-color: #FFEA9D; 
}

.recomecar-button:hover {
  background-color: #ffdd7a;
}

.sair-button {
  background-color: #FBADAD; 
}

.sair-button:hover {
  background-color: #f99a9a;
}

.sair-link {
  text-decoration: none;
}
</style>