<template>
  <div class="game-page-container">
    <div class="game-header">
      <div class="time-display">{{ formatTime(gameStore.timeLeft) }}</div>
      <div class="score-display">Acertos: {{ gameStore.correctAnswers }}</div>
      <div class="error-display">Erros: {{ gameStore.wrongAnswers }}</div>
    </div>
    <div class="sound-debug" v-if="gameStore.debugSound && gameStore.debugSound.last">
      <small>sound: {{ gameStore.debugSound.last }} — {{ gameStore.debugSound.status }}</small>
    </div>

    <div class="pattern-section">
      <p class="instruction">Escolha o item que completa a sequência:</p>
      <div class="pattern-display">
        <template v-for="(item, index) in gameStore.currentPattern" :key="index">
          <div v-if="item === '?'" class="pattern-item question">?</div>
          <div v-else class="pattern-item shape-item">
            <svg v-if="item.shape === 'circle'" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="16" :fill="item.color" />
            </svg>
            <svg v-else-if="item.shape === 'square'" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="6" width="28" height="28" rx="6" :fill="item.color" />
            </svg>
            <svg v-else width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <polygon points="20,6 34,30 6,30" :fill="item.color" />
            </svg>
          </div>
        </template>
      </div>
    </div>

    <div class="options-section">
      <p class="options-title">Opções:</p>
      <div class="alternatives-grid">
        <button v-for="(alt, index) in gameStore.alternatives" :key="index" @click="gameStore.checkAnswer(alt)"
          class="shape-option">
          <svg v-if="alt.shape === 'circle'" width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="24" :fill="alt.color" />
          </svg>
          <svg v-else-if="alt.shape === 'square'" width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="6" width="48" height="48" rx="8" :fill="alt.color" />
          </svg>
          <svg v-else width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <polygon points="30,8 52,52 8,52" :fill="alt.color" />
          </svg>
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

function getAlternativeStyle(alt) {
  if (gameStore.patternType === 'shapes') {
    return { backgroundColor: alt }
  }
  return {}
}
</script>

<style scoped>
.game-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background-color: #f0f0f0;
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

.error-display {
  background-color: #FFD7D7; 
  color: #111;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 1.2em;
  font-weight: bold;
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
  color: rgba(175,185,197,0.24); /* #AFB9C53D 24% */
  background-color: rgba(175,185,197,0.06);
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
  background-color: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  font-weight: bold;
  color: #555;
  border: 1px solid #ccc;
}

.pattern-item.shape-item {
  border: none;
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
  font-size: 1.2em;
  font-weight: bold;
  color: #555;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
}

.alternatives-grid button.shape-option {
  border: none;
}

.alternatives-grid button:hover {
  background-color: #e0e0e0;
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
}

.recomecar-button {
  background-color: #FFEA9D; 
  color: #ffffff; 

.recomecar-button:hover {
  background-color: #ffcc80;
}

.sair-button {
  background-color: #FBADAD; 
  color: #ffffff; 
}

.sair-button:hover {
  background-color: #ef9a9a;
}

.sair-link {
  text-decoration: none;
}
</style>
