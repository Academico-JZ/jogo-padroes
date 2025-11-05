<template>
  <div class="feedback-container">
    <div class="feedback-box">
      <p class="feedback-message" v-html="gameStore.feedbackMessage"></p>
    </div>
    <div class="game-controls">
      <RouterLink to="/app" class="sair-link">
        <button class="recomecar-button" @click="gameStore.startGame()">RECOMEÇAR</button>
      </RouterLink>
      <RouterLink to="/" class="sair-link">
        <button class="sair-button" @click="gameStore.endGame()">SAIR</button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/gameStore'
import { RouterLink } from 'vue-router'

const gameStore = useGameStore()
</script>

<style scoped>
.feedback-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at 1px 5px, #faadad4f 150px, transparent 0px), radial-gradient(circle at 100vw 1px, #FFEA9D 20vh, transparent 0px), radial-gradient(circle at 1px 100vh, #AAF1CB5C 20vh, transparent 0px), radial-gradient(circle at 100vw 100vh, #C2DEFF 20vh, transparent 0px);
}

.feedback-box {
  background-color: #ABF2CB;
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
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.25;
}

.game-controls {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 350px;
  margin-top: 30px;
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