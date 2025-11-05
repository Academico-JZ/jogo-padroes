<script setup>
import { useGameStore } from '../stores/gameStore'
import { RouterLink } from 'vue-router'

const gameStore = useGameStore()

function playAgain() {
  gameStore.startGame()
}
</script>

<template>
  <div class="feedback-container">
    <div class="circle top-left-circle"></div>
    <div class="circle top-right-circle"></div>
    <div class="circle bottom-left-circle"></div>

    <div class="feedback-box">
      <p class="feedback-message">{{ gameStore.feedbackMessage }}</p>
      <p>Acertos: {{ gameStore.correctAnswers }}</p>
      <p>Erros: {{ gameStore.wrongAnswers }}</p>
      <RouterLink to="/app" class="play-again-link">
        <button @click="playAgain()">JOGAR NOVAMENTE</button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.feedback-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 0% 0%, rgba(250,173,173,0.36) 180px, transparent 0px), 
    radial-gradient(circle at 100% 0%, rgba(255,234,157,0.36) 260px, transparent 0px), 
    radial-gradient(circle at 0% 100%, rgba(228,225,255,0.36) 200px, transparent 0px), 
    radial-gradient(circle at 100% 100%, rgba(225,228,230,0.6) 220px, transparent 0px); 
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.4;
}

.top-left-circle {
  display: none; /
}

.top-right-circle {
  display: none;
}

.bottom-left-circle {
  display: none;
}

.feedback-box {
  background-color: rgba(209, 252, 236, 0.9); 
  border-radius: 12px;
  padding: 36px 28px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  z-index: 2;
  width: min(420px, 88%);
  border: 2px solid rgba(200, 245, 225, 0.6);
}

.feedback-message {
  font-size: 1.35rem;
  font-weight: 900;
  color: #083d2e;
  margin: 0 0 14px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.25;
}

.feedback-box p {
  font-size: 1.1em;
  color: #555;
  margin-bottom: 10px;
}

.play-again-link {
  text-decoration: none;
  margin-top: 20px;
  display: inline-block;
}

.feedback-box button {
  padding: 14px 28px;
  border-radius: 12px;
  border: none;
  background-color: #FFEA9D;
  color: #ffffff;
  font-size: 1.05rem;
  font-weight: 800;
  cursor: pointer;
  transition: background-color 0.16s;
}

.feedback-box button:hover {
  background-color: #ffd26a;
}
</style>
